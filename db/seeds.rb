# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Seat.destroy_all
Classroom.destroy_all
Student.destroy_all
SClass.destroy_all
User.destroy_all

# User
puts("Creating users...")
michael = User.create!(username: "michael", password: "michaeliscool", email: "michael@michael.com")

# Class
puts("Creating classes...")
class_3a = SClass.create!(year: 3, kumi: "A", subject: "English", schedule: "2nd period", user: michael)
class_2b = SClass.create!(year: 2, kumi: "B", subject: "English", schedule: "3rd period", user: michael)

# Students
puts("Creating students...")
student_1 = Student.create!(name: "Keisuke Yamada", kanji_name: "山田啓介", gender: "Male", student_number: "1", s_class: class_3a)
student_2 = Student.create!(name: "Yuria Hirota", kanji_name: "広田ユリア", gender: "Female", student_number: "2", s_class: class_3a)
student_3 = Student.create!(name: "Tsukimi Takeda", kanji_name: "武田月見", gender: "Female", student_number: "3", s_class: class_3a)
student_4 = Student.create!(name: "Kaede Nakano", kanji_name: "中野楓", gender: "Unknown", student_number: "4", s_class: class_3a)
student_5 = Student.create!(name: "Kimiko Hirata", kanji_name: "平田貴美子", gender: "Female", student_number: "5", s_class: class_2b)
student_6 = Student.create!(name: "Kakashi Kamata", kanji_name: "釜田案山子", gender: "Male", student_number: "6", s_class: class_2b)
student_7 = Student.create!(name: "Sakura Fujimoto", kanji_name: "藤本サクラ", gender: "Female", student_number: "7", s_class: class_2b)
student_8 = Student.create!(name: "Aoi Uchida", kanji_name: "内田葵", gender: "Other", student_number: "8", s_class: class_2b)

# Classroom
puts("Creating classrooms...")
classroom_1 = Classroom.create!(name: "Classroom 3A", total_rows: 5, total_columns: 5, max_seats: 25, user: michael)

# Seats
puts("Creating seats...")
Seat.create!(row: 1, column: 3, student: student_1, classroom: classroom_1)
Seat.create!(row: 1, column: 2, student: student_2, classroom: classroom_1)
Seat.create!(row: 1, column: 1, student: student_3, classroom: classroom_1)
Seat.create!(row: 2, column: 3, student: student_4, classroom: classroom_1)
Seat.create!(row: 1, column: 4, student: student_5, classroom: classroom_1)
Seat.create!(row: 1, column: 3, student: student_6, classroom: classroom_1)
Seat.create!(row: 2, column: 3, student: student_7, classroom: classroom_1)
Seat.create!(row: 2, column: 2, student: student_8, classroom: classroom_1)
