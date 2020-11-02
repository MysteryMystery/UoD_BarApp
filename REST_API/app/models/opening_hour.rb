class OpeningHour < ApplicationRecord
  belongs_to :pub
  has_many :opening_hour_days
end
