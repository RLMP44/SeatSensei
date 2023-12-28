require 'rails_helper'

RSpec.describe Student, type: :model do
  # let(:michael) { User.create!(username: "michael", password: "michaeliscool", email: "michael@michael.com") }
  # new syntax with factory bot
  let(:michael) { create :user }

  let(:class_3a) do
    SClass.create!(year: 3, kumi: "A", subject: "English", schedule: "2nd period", user: michael)
  end

  it "has a name, gender, student_number and class assigned on creation" do
    new_student = Student.new(name: "Keisuke Yamada", gender: "Male", student_number: "1", s_class: class_3a)
    expect(new_student.save).to eq(true)
  end

  it "has 0 points assigned on creation" do
    new_student = Student.create!(name: "Keisuke Yamada", gender: "Male", student_number: "1", s_class: class_3a)
    expect(new_student.points).to eq(0)
  end

  context 'a student must have a gender described in the list on creation: "Male", "Female", "Other", "Unknown"' do
    it "has a gender described in the list" do
      new_student = Student.new(name: "Keisuke Yamada", gender: "not known", student_number: "1", s_class: class_3a)
      expect(new_student.save).to eq(false)
    end
  end
end
