Rails.application.routes.draw do
  devise_for :users

  # As a user, I can see the dashboard
  root to: "pages#home"

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # As a user, I can create a new class
  # As a user, I can view a class
  resources :s_classes, only: [:show, :create, :destroy] do
    # As a user, I can add students to a class
    resources :students, only: [:create, :update, :destroy, :show]
    # resources :students, defaults: { format: :json }, only: :show
  end

  post "redirect_to_classroom", to: "s_classes#redirect_to_classroom"

  # As a user, I can create a classroom
  resources :classrooms, only: [:show, :create, :update, :destroy] do
    resources :seats, only: [:create, :update]
    # As a user, I can create a seating arrangement for a class in a classroom
    # As a user, I can save a seating arrangement for a class in a classroom
    resources :arrangements, only: [:create, :update]
  end
end
