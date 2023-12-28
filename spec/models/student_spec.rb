require 'rails_helper'

RSpec.describe Student, type: :model do
  # let(:michael) { User.create!(username: "michael", password: "michaeliscool", email: "michael@michael.com") }
  # new syntax with factory bot
  # let(:michael) { create :user }

  it "has a name, gender, student_number and class assigned on creation" do
    new_student = build(:student)
    expect(new_student.save).to eq(true)
  end

  it "has 0 points assigned on creation" do
    new_student = create(:student)
    expect(new_student.points).to eq(0)
  end

  context 'a student must have a gender described in the list on creation: "Male", "Female", "Other", "Unknown"' do
    it "has a gender described in the list" do
      new_student = build(:student, gender: "not known")
      expect(new_student.save).to eq(false)
    end
  end
end
