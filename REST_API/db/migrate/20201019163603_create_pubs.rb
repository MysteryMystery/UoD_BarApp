class CreatePubs < ActiveRecord::Migration[6.0]
  def change
    create_table :pubs do |t|
      t.string :name

      t.string :address_line_1
      t.string :address_line_2
      t.string :address_line_3
      t.string :address_line_4
      t.string :address_postcode

      t.string :description

      t.timestamps
    end
  end
end
