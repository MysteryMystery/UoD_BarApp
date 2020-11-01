class Pub < ApplicationRecord
  include Rails.application.routes.url_helpers

  has_many :pub_table
  has_many_attached :images
  has_one :user

  def as_json(options = nil)
    myJson = super
    myJson[:attributes][:images] = self.images.map do |image| polymorphic_url image, only_path: true end
    myJson
  end
end
