class BookingsController < ApplicationController
  before_action :set_booking, only: [:show, :update, :destroy]

  before_action :authenticate_request, only: [:show, :index, :update]
  before_action :set_pub, only: [:index]

  # GET /pubs/:pub/bookings
  def index
    @bookings = Booking.all

    render json: @bookings
  end

  # GET /bookings/1
  def show
    render json: @booking
  end

  # POST /bookings
  def create
    booking_data = booking_params
    booking_data[:minutes] = 120

    # Validate and get a table
    open_slots = open_booking_slots_internal params[:pub_id], params[:table_capacity], params[:date]
    if open_slots.include? params[:time]
      all_tables_of_capacity = PubTable.where(table_capacity: params[:table_capacity]).map { |x| x.id }
      bookings_at_this_time = existing_bookings_on_date(params[:pub_id], params[:date], params[:table_capacity]).where(time: params[:time])

      #guarranteed a free table as validation in self::open_booking_slots_internal
      bookings_at_this_time.each { |booking| all_tables_of_capacity.delete booking.pub_table_id }
      booking_data[:pub_table] = all_tables_of_capacity[0]

      @booking = Booking.new(booking_data)

      if @booking.save
        render json: @booking, status: :created, location: @booking
      else
        render json: @booking.errors, status: :unprocessable_entity
      end
    else
      render json: { :error => "validation failed" }
    end

  end

  # PATCH/PUT /bookings/1
  def update
    if @booking.update(booking_params)
      render json: @booking
    else
      render json: @booking.errors, status: :unprocessable_entity
    end
  end

  # DELETE /bookings/1
  def destroy
    @booking.destroy
  end

  def open_booking_slots
    #pub = params[:pub]
    #     capacity = params[:table_capacity]
    #     query_date = params[:date] # y-m-d
    #
    open_slots = open_booking_slots_internal params[:pub], params[:table_capacity], params[:date]
    return_open_booking_slots open_slots
  end

  private
    def open_booking_slots_internal pub, capacity, query_date
      time = query_date.to_time
      weekday = time.wday #0 = sunday, 0..6

      opening_hours_models = hours_open_on_day pub, weekday
      if opening_hours_models.empty?
        return return_open_booking_slots []
      end

      all_valid_tables = pub_tables(pub).where(table_capacity: capacity)
      existing_bookings = existing_bookings_on_date(pub, query_date, capacity)

      open_slots = []
      opening_hours_models.each do |opening_hour|
        start_time = opening_hour.start
        end_time = opening_hour.end

        while (start_time - end_time) < 0 do
          bookings_at_this_time = existing_bookings.where(time: start_time)
          if all_valid_tables.length > bookings_at_this_time.length
            # spare table, add to available times
            open_slots.push(start_time.strftime(presentable_time_format))
          end
          start_time = start_time + 120 * 60 # TIME IS IMMUTABLE IN RUBY!!!!
        end
      end

      open_slots
    end

    def return_open_booking_slots times
      render json: {:times => times}
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_booking
      @booking = Booking.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def booking_params
      params.require(:booking)
          .permit(
              :pub_id,
              :date,
              :time,
              :table_capacity,
          #:minutes,
          #:pub_table_id
          )
    end

    # @param pub: Pub
    # @param day: int 0..6
    # @return array of records
    def hours_open_on_day pub, day
      OpeningHour.joins(:opening_hour_days)
        .where(pub: pub) # of pub
        .where(opening_hour_days: { day_int: day }) # on specified day
        .order(start: :asc)
    end

    # @param pub: Pub
    # @param date: string of format y-m-d
    # @param capacity: int
    # @return array of records
    def existing_bookings_on_date pub, date, capacity
      Booking
          .joins(:pub_table)
          .where(date: date)
          .where(pub: pub)
          .where(pub_tables: {
              table_capacity: capacity
          })
          .order(time: :asc)
    end

  def pub_tables pub
    PubTable.where(pub: pub).order(:table_capacity)
  end

  def presentable_time_format
    "%H:%M"
  end
end
