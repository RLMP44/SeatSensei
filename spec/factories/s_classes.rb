FactoryBot.define do
  factory :s_class do
    year { 3 }
    kumi { 'A' }
    subject { 'English' }
    schedule { '2nd period' }
    association :user
  end
end
