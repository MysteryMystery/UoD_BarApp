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
    pubData[:user_id] = @user.id
    @pub = Pub.new(pubData)
    @pub.images.attach(params[:images])

    if @pub.save
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

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pub
      @pub = Pub.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def pub_params
      params
          .require(:pub)
          .permit(:name, :address_line_1, :address_line_2, :address_line_3,
                                  :address_line_4, :address_postcode, :description, images: [])
    end
end
