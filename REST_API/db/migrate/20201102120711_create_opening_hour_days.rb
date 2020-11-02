class CreateOpeningHourDays < ActiveRecord::Migration[6.0]
  def change
    create_table :opening_hour_days do |t|
      t.references :opening_hour, index: true, foreign_key: true
      t.integer :day_int
      t.timestamps
    end
  end
end
