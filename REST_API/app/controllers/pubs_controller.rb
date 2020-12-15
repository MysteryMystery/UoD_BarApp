class PubsController < ApplicationController
  before_action :authenticate_request, only: [:create, :update, :destroy, :reset_opening_hours, :reset_tables, :delete_image]
  before_action :set_pub, only: [:show, :update, :destroy, :reset_opening_hours, :reset_tables, :delete_image]
  before_action :check_is_owned_pub, only: [:update, :destroy, :reset_opening_hours, :reset_tables, :delete_image]

  # GET /pubs
  def index
    @pubs = Pub.all

    standardise @pubs
  end

  # GET /pubs/1
  def show
    standardise @pub
  end

  # POST /pubs
  def create
    pubData = pub_params
    #return render json: pubData.as_json
    pubData[:user_id] = @user.id
    @pub = Pub.new(pubData)
    @pub.save

    blobs = Array.new
    params[:pub][:images].each do |image|
      blobs << ActiveStorage::Blob.create_after_upload!(
          io: StringIO.new((Base64.decode64(image.split(",")[1]))), # Take the actual image string
          filename: DateTime.now.strftime("%Q") + ".png",
          content_type: "image/png",
          )
    end
    @pub.images.attach blobs

    #@pub.images.attach(params[:pub][:images])
    #@pub.pub_tables.create(pubData.fetch(:pub_tables))
    #@pub.opening_hours.create(pub_opening_hours_params)

    if @pub
      render json: @pub, status: :created, location: @pub
    else
      render json: @pub.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /pubs/1
  def update
    if @pub.update(pub_params)
      render json: @pub
    else
      render json: @pub.errors, status: :unprocessable_entity
    end
  end

  # DELETE /pubs/1
  def destroy
    @pub.destroy
  end

  def reset_opening_hours
    @pub.opening_hours.delete_all
  end

  def reset_tables
    @pub.pub_tables.delete_all
  end

  def delete_image
    image = ActiveStorage::Blob.find_by(key: params[:key])
    if image
      image.purge
    end
  end

  def image
    image = ActiveStorage::Blob.find_by(key: params[:key])
    send_data image.download,
              :type => "image/png",
              :disposition => "inline",
              :filename => ((0..10).map do rand(9) end).join("") + ".png"
  end

  private
    # Use callbacks to share common setup or constraints between actions.

    # Only allow a trusted parameter "white list" through.
    def pub_params
      params
          .require(:pub)
          .permit(:name,
                  :address_line_1,
                  :address_line_2,
                  :address_line_3,
                  :address_line_4,
                  :address_postcode,
                  :description,
                  pub_tables_attributes: [
                      :id,
                      :table_number,
                      :table_capacity,
                      :location
                  ],
                  opening_hours_attributes: [
                      :id,
                      :start,
                      :end,
                      opening_hour_days_attributes: [
                          :id,
                          :day_int
                      ]
                  ],
          #images: []
                  )
    end
end
