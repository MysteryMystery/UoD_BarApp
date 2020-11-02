class CreateOpeningHours < ActiveRecord::Migration[6.0]
  def change
    create_table :opening_hours do |t|
      t.references :pub, index: true, foreign_key: true

      t.time :start
      t.time :end

      t.timestamps
    end
  end
end
