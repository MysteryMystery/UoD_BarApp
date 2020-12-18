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
    json = super options
    #add_relations_to_json(json, :pub, :pub_table)
  end
end
