class OpeningHour < ApplicationRecord
  belongs_to :pub
  has_many :opening_hour_days

  accepts_nested_attributes_for :opening_hour_days

  def as_json(options = nil)
    json = super
    add_relations_to_json(json, :opening_hour_days)
  end
end
