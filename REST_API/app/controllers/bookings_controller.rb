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
    @booking = Booking.new(booking_params)

    if @booking.save
      render json: @booking, status: :created, location: @booking
    else
      render json: @booking.errors, status: :unprocessable_entity
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
    pub = params[:pub]
    query_date = params[:date] # y-m-d

    #Can't seem to find a method for inputting whole date as is, so going to have to split it and pass
    # each individually
    time = query_date.to_time
    weekday = time.wday #0 = sunday, 0..6

    opening_hours = hours_open_on_day pub, weekday
    if opening_hours == nil
      return render json: [] # no time for bookings
    end

    existing_bookings = existing_bookings_on_date(pub, query_date).to_a
    #return render json: existing_bookings

    # Now to build array from our ordered records
    # 30 mins intervals as default. Each booking can determine their booking length
    open_slots = Array.new
    opening_hours.each do |opening_hour|
      start_time = opening_hour.start
      end_time = opening_hour.end

      while (start_time - end_time) < 0 do
        if existing_bookings.length == 0 || existing_bookings[0].time.strftime(presentable_time_format) != start_time.strftime(presentable_time_format)
          open_slots.push(start_time.strftime(presentable_time_format))
        else
          start_time = start_time + (existing_bookings[0].minutes - 30) * 60
          existing_bookings.shift(1)
        end

        # REMEMBER: TIME IS IMMUTABLE IN RUBY! 1hr wasted.
        start_time = start_time + 30 * 60
      end
    end

    render json: open_slots
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_booking
      @booking = Booking.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def booking_params
      params.require(:booking).permit(:pub_id, :date, :time, :minutes, :pub_table_id)
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
    # @return array of records
    def existing_bookings_on_date pub, date
      Booking
        .where(date: date)
        .where(pub: pub)
        .order(time: :asc)
    end

  def presentable_time_format
    "%H:%M"
  end
end
