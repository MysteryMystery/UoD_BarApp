# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create(
    email: "100380362@unimail.derby.ac.uk",
    password: "password",
    password_confirmation: "password"
)

10.times do |n|
  pub = Pub.create(
      name: Faker::Restaurant.name,
      description: Faker::Restaurant.description,
      address_line_1: Faker::Address.street_address,
      address_line_2: Faker::Address.community,
      address_line_3: Faker::Address.city,
      address_line_4: Faker::Address.country,
      address_postcode: Faker::Address.postcode,

      user_id: user.id
  )

  Faker::Number.between(from: 1, to: 30).times do |x|
    PubTable.create(
        pub_id: pub.id,
        table_number: x,
        table_capacity: Faker::Number.between(from: 2, to: 12),
        location: "Indoors"
    )
  end
end