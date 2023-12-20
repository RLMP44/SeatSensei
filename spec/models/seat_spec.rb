require 'rails_helper'

RSpec.describe Seat, type: :model do
  it "has a row and a column as integers" do
    michael = User.create!(username: "michael", password: "michaeliscool", email: "michael@michael.com")
    class_3a = SClass.create!(year: 3, kumi: "A", subject: "English", schedule: "2nd period", user: michael)
    student1 = Student.new(name: "Keisuke Yamada", gender: "Male", student_number: "1", s_class: class_3a)
    student2 = Student.create!(name: "Yuria Hirota", gender: "Female", student_number: "2", s_class: class_3a)
    classroom1 = Classroom.create!(name: "Classroom 3A", total_rows: 5, total_columns: 5, max_seats: 25, user: michael)
    seat1 = Seat.new(student: student1, classroom: classroom1, row: "A", column: 2)
    seat2 = Seat.new(student: student2, classroom: classroom1, row: 1, column: "B")
    expect([seat1.save, seat2.save]).to eq([false, false])
  end
end
