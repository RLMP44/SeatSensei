FactoryBot.define do
  factory :student do
    name { "Keisuke Yamada" }
    gender { "Male" }
    student_number { '1' }
    association :s_class
  end

  factory :another_student, class: Student do
    name { "Yuria Hirota" }
    gender { "Female" }
    student_number { '2' }
    association :s_class
  end
end
