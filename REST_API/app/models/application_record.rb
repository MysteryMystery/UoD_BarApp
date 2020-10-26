class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def as_json(options = nil)
    json = {}
    modelJson = super
    json[:type] = self.class.table_name
    json[:attributes] = modelJson
    json[:id] = self.id
    json
  end
end
