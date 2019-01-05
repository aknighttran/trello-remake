Rails.application.routes.draw do
  namespace :api do
    resources :boards do
      resources :lists 
    end

    resources :lists do
      resources :cards
    end
  end

end
