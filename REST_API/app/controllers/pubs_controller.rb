class PubsController < ApplicationController
  before_action :authenticate_request, only: [:create, :update, :destroy]
  before_action :set_pub, only: [:show, :update, :destroy]

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
    #@pub.images.attach(pub_image_params)
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

  def image
    image = ActiveStorage::Blob.find_by(key: params[:key])
    send_data image.download,
              :type => "image/png",
              :disposition => "inline",
              :filename => ((0..10).map do rand(9) end).join("") + ".png"
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pub
      @pub = Pub.find(params[:id])
    end

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
                      :table_number,
                      :table_capacity,
                      :location
                  ],
                  opening_hours_attributes: [
                      :start,
                      :end,
                      days: []
                  ],
                  images: []
                  )
    end
end
