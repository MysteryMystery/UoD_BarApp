class Booking < ApplicationRecord
  belongs_to :pub
  belongs_to :pub_table
end
