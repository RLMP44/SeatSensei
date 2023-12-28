FactoryBot.define do
  factory :classroom do
    name { "Classroom 3A" }
    total_rows { 6 }
    total_columns { 4 }
    max_seats { 24 }
    association :user
  end
end
