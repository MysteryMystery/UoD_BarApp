Rails.application.routes.draw do
  post "login", to: "users#login"
  post "signup", to: "users#create"
  post "authenticate", to:"users#authenticate_token"

  get "users/pubs", to:"users#pubs"
  get "pubs/thumbnails/:key", to: "pubs#image", as: "pub_thumbnail"
  get "pubs/:id/bookings/(:date)", to: "bookings#index"
  get "pubs/:pub/:date/:table_capacity", to: "bookings#open_booking_slots"
  delete "pubs/:id/opening_hours", to: "pubs#reset_opening_hours"
  delete "pubs/:id/pub_tables", to: "pubs#reset_tables"
  delete "pubs/:id/image", to: "pubs#delete_image"
  resources :bookings, except: :index # index will be /pub/{pub}/bookings instead of /bookings
  resources :users
  resources :pubs
  get '*other', to: 'static#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
