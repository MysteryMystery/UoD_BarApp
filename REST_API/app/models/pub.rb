class Pub < ApplicationRecord

  def as_json(options = nil)
    json = {}
    modelJson = super
    json[:type] = "pubs"
    json[:attributes] = modelJson
    json[:id] = self.id
    json
  end
end
