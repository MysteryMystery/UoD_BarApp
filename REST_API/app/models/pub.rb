class Pub < ApplicationRecord
  include Rails.application.routes.url_helpers

  has_many :pub_tables
  has_many :opening_hours
  has_many :bookings
  has_many_attached :images
  has_one :user

  accepts_nested_attributes_for :pub_tables
  accepts_nested_attributes_for :opening_hours

  def as_json(options = nil)
    myJson = super
    myJson[:attributes][:images] = self.images.map do |image|
      Rails.application.routes.default_url_options[:host] + pub_thumbnail_path(image.key)
    end
    myJson
  end
end
