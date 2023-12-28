FactoryBot.define do
  factory :seat do
    row { 1 }
    column { 2 }
    association :student
    association :classroom
  end

  factory :another_seat, class: Seat do
    row { 2 }
    column { 3 }
    association :another_student
    association :classroom
  end
end
