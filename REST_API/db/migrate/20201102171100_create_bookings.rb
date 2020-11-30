class CreateBookings < ActiveRecord::Migration[6.0]
  def change
    create_table :bookings do |t|
      t.references :pub, index: true, foreign_key: true
      t.references :pub_table, index:true, foreign_key: true

      t.date :date
      t.time :time
      t.integer :minutes

      t.text :booking_number, index: { unique: true }

      t.timestamps
    end
  end
end
