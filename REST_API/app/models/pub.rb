class Pub < ApplicationRecord
  has_many :pub_table
  has_one :user
end
