# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_10_25_103547) do

  create_table "pub_tables", force: :cascade do |t|
    t.integer "pub_id"
    t.string "table_number"
    t.integer "table_capacity"
    t.string "location"
    t.index ["pub_id"], name: "index_pub_tables_on_pub_id"
  end

  create_table "pubs", force: :cascade do |t|
    t.string "name"
    t.string "address_line_1"
    t.string "address_line_2"
    t.string "address_line_3"
    t.string "address_line_4"
    t.string "address_postcode"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "pub_tables", "pubs"
end
