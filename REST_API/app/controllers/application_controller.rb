class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection

  #protect_from_forgery with: :exception

  def standardise(toRender)
    render json: {"data" => toRender}
  end

  protected
    def authenticate_request
      user_email = User.decode_jwt(params[:jwt])
      if user_email && (user = User.find_by_email(user_email))
        @user = user
      else abort "JWT missing. Need to make this graceful."
      end
    end
end
