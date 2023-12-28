require 'rails_helper'

RSpec.describe Seat, type: :model do
  let(:michael) { create :user }

  let(:class_3a) do
    SClass.create!(year: 3, kumi: "A", subject: "English", schedule: "2nd period", user: michael)
  end

  let(:student1) do
    Student.create!(name: "Keisuke Yamada", gender: "Male", student_number: "1", s_class: class_3a)
  end

  let(:student2) do
    Student.create!(name: "Yuria Hirota", gender: "Female", student_number: "2", s_class: class_3a)
  end

  let(:classroom1) do
    Classroom.create!(name: "Classroom 3A", total_rows: 5, total_columns: 5, max_seats: 25, user: michael)
  end

  it "has a row and a column as integers" do
    seat1 = Seat.new(student: student1, classroom: classroom1, row: "A", column: 2)
    seat2 = Seat.new(student: student2, classroom: classroom1, row: 1, column: "B")
    expect([seat1.save, seat2.save]).to eq([false, false])
  end
end
