class CreatePubs < ActiveRecord::Migration[6.0]
  def change
    create_table :pubs do |t|
      t.int :number_of_tables

      t.timestamps
    end
  end
end
