FactoryBot.define do
  factory :user do
    username { 'michael' }
    email { 'michael@michael.com' }
    password { 'michaeliscool' }
    password_confirmation { 'michaeliscool' }
  end
end
