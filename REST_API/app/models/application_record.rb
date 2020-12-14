class ApplicationRecord < ActiveRecord::Base
  #include ActiveStorageSupport::SupportForBase64

  self.abstract_class = true

  def as_json(options = nil)
    json = {}
    modelJson = super
    json[:type] = self.class.table_name
    json[:attributes] = modelJson
    json[:id] = self.id
=begin
    json[:relationships] =  if options[:get_related_objects_please_be_unique]
                              get_relationship_json_objects options
                            else
                              "false"
                            end
=end
    json
  end

  protected
    def check_is_owned_pub
      unless @user.owns_pub @pub
        render json: [
            "message" => "User does not own this pub."
        ]
      end
    end

  def add_relation_to_json(json, relation)
    associated_model = self.send(relation)
    relation_type = self._reflections[relation.to_s].macro

    if json[:relationships].nil?
      json[:relationships] = {}
    end
    if json[:relationships][relation.to_s].nil?
      json[:relationships][relation.to_s] = {:data => Array.new}
    end
    if json[:included].nil?
      json[:included] = []
    end

    if relation_type == :belongs_to || relation_type == :has_one
      json[:relationships][relation.to_s][:data] << {:type => relation.to_s, :id => associated_model.id}
      json[:included] << model.as_json
    else
      associated_model.each do |model|
        json[:relationships][relation.to_s][:data] << {:type => relation.to_s, :id => model.id}
        json[:included] << model.as_json
      end
    end
    json
  end

  def add_relations_to_json(json, relations)
    relations.each { |relation| json = add_relation_to_json(json, relation) }
    json
  end

  def wanted_relations
    [:belongs_to, :has_many, :belongs_to_many, :has_one]
  end

  def excluded_relation_models
    %w[images_attachments images_blobs] # has to be string literals rather than symbols. No idea why.
  end

  private
  # Can't seem to get it to work. recursion error somewhere but can't find it.
  # resort to manually defining relations
    def get_relationship_json_objects(options)
      # With help from: https://stackoverflow.com/questions/8371574/is-there-a-way-to-list-all-belongs-to-associations
      my_reflections = self._reflections.select do |assoc_name, reflection|
        wanted_relations.include?(reflection.macro) && !excluded_relation_models.include?(assoc_name)
      end

      objects = []
      my_reflections.keys.each do |assoc_name|
        objects.append(self.send(assoc_name).as_json(options = {get_related_objects_please_be_unique: false}))
      end
      objects
    end
end
