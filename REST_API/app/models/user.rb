class User < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: true

  has_many :pubs

  def encode_jwt(payload)
    JWT.encode payload, Rails.application.secrets.secret_key_base, "HS256"
  end

  def self.decode_jwt(token)
    body = JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
    body[0]
    rescue JWT::ExpiredSignature
      nil
  end
end
