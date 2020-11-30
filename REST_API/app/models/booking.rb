require 'date'

class Booking < ApplicationRecord
  belongs_to :pub
  belongs_to :pub_table

  # static methods
  class << self
    def new_booking_number
      Time.now.strftime "%Y%m%d%H%M%S"
    end
  end

  def as_json(options = nil)
    json = super
    json[:relationships] = {
        :pub_table => {
            :data => self.pub_table.as_json
        },
        :pub => {
            :data => self .pub.as_json
        }
    }
    json
  end
end
