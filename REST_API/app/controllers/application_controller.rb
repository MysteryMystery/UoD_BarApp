class ApplicationController < ActionController::API
  def standardise(toRender)
    render json: {"data" => toRender}
  end

  def authenticate_request
    user_email = User.decode_jwt(params[:jwt])
    if user_email && User.find_by_email(user_email)
      @user = user
    else abort "JWT missing. Need to make this graceful."
    end
  end
end
