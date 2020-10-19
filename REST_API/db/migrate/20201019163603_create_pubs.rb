class CreatePubs < ActiveRecord::Migration[6.0]
  def change
    create_table :pubs do |t|
      t.integer :number_of_tables
      t.string :name

      t.timestamps
    end
  end
end
