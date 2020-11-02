Rails.application.routes.draw do
  post "login", to: "users#login"
  post "signup", to: "users#create"
  post "authenticate", to:"users#authenticate_token"

  get "users/pubs", to:"users#pubs"

  get "pubs/thumbnails/:key", to: "pubs#image", as: "pub_thumbnail"
  resources :users
  resources :pubs
  get '*other', to: 'static#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
