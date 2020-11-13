class BookingsController < ApplicationController
  before_action :set_booking, only: [:show, :update, :destroy]

  # GET /bookings
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
    query_date_array = query_date.split("-")
    time = Time.new query_date_array[0], query_date_array[1], query_date_array[2]
    weekday = time.wday #0 = sunday, 0..6

    opening_hours = hours_open_on_day pub, weekday
    existing_bookings = existing_bookings_on_date pub, query_date
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_booking
      @booking = Booking.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def booking_params
      params.fetch(:booking, {})
    end

    def hours_open_on_day pub, day
      OpeningHour.joins(:opening_hour_days)
        .where(pub_id: pub.id) # of pub
        .where(opening_hour_days: { day_int: day }) # on specified day
        .take
    end

    def existing_bookings_on_date pub, date
      Booking
        .where(date: date)
        .where(pub_id: pub.id)
        .order(time: :asc)
        .take
    end
end
