class CreatePubTables < ActiveRecord::Migration[6.0]
  def change
    create_table :pub_tables do |t|
      t.references :pub, index: true, foreign_key: true #pub_id #TODO Learn how to make unique(pub_id, table_number)
      t.string :table_number #Incase a pub comes along with table names rather than numbers
      t.integer :table_capacity
      t.string :location
    end
  end
end
