class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection

  #protect_from_forgery with: :exception

  before_action :set_auth_user

  def standardise(toRender)
    render json: {"data" => toRender}
  end

  def authenticate_request
=begin
    user_email = User.decode_jwt(params[:jwt])
    if user_email && User.find_by_email(user_email)
      @user = user
    else abort "JWT missing. Need to make this graceful."
    end
=end
    unless @auth
      abort "Not authenticated."
    end
  end

  protected
    def set_auth_user
      @auth ||= session[:user_id] && User.find_by(id: session[:user_id])
    end
end
