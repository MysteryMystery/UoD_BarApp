class ApplicationRecord < ActiveRecord::Base
  #include ActiveStorageSupport::SupportForBase64

  self.abstract_class = true

  def as_json(options = nil)
    json = {}
    modelJson = super
    json[:type] = self.class.table_name
    json[:attributes] = modelJson
    json[:id] = self.id
    json
  end

  protected
    def check_is_owned_pub
      unless @user.owns_pub @pub
        render json: [
            "message" => "User does not own this pub."
        ]
      end
    end
end
