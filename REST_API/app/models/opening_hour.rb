class OpeningHour < ApplicationRecord
  belongs_to :pub
  has_many :opening_hour_days

  accepts_nested_attributes_for :opening_hour_days
end
