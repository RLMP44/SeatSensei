FactoryBot.define do
  # using a sequence to prevent creation of users with the same email
  sequence :email do |n|
    "email#{n}@michael.com"
  end

  factory :user do
    username { 'michael' }
    email
    password { 'michaeliscool' }
    password_confirmation { 'michaeliscool' }
  end
end
