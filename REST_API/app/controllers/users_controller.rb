class UsersController < ApplicationController
  before_action :authenticate_request, only: [:index, :show, :update, :destroy, :pubs]
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all

    standardise @users
  end

  # GET /users/1
  def show
    standardise @user
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  def pubs
    pubs_belonging_to_user = @user.pubs
    standardise pubs_belonging_to_user
  end

  def login
    user = User.find_by_email params[:email]
    if user && user.authenticate(params[:password])
      #session[:user_id] = user.id
      #render json: {:status => :ok}
      user_as_json = user.as_json
      user_as_json[:attributes][:jwt] = user.encode_jwt(user.email)
      standardise user_as_json
    else
      render json: {:status => :failed}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end

    def auth_token_param
      params.require(:user).permit(:auth_token)
    end
end
