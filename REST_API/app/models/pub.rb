class Pub < ApplicationRecord
  has_many :pub_table

  def as_json(options = nil)
    json = {}
    modelJson = super
    json[:type] = "pubs"
    json[:attributes] = modelJson
    json[:id] = self.id
    json
  end
end
