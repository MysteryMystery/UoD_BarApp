class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection

  #protect_from_forgery with: :exception

  def standardise(toRender)
    render json: {"data" => toRender}
  end

  protected
  # If authenticated, @user will be available during this request
    def authenticate_request
      begin
        user_email = User.decode_jwt(params[:jwt])
        if user_email && (user = User.find_by_email(user_email))
          @user = user
        else
          raise "User not found"
        end
      rescue
        render json: [
            "message" => "JWT missing or invalid.",
            :errors => [
                :message => "JWT missing or invalid."
            ]
        ]
      end
    end

    def set_pub
      @pub = Pub.find(params[:id])
    end
end
