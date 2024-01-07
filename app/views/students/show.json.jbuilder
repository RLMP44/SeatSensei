json.extract! @student, :id, :name, :kanji_name, :gender, :student_number, :points, :photo
json.comments @student.comments do |comment|
  json.extract! comment, :id, :content
end
