class ChangeCommentsInStudents < ActiveRecord::Migration[7.1]
  def change
    change_column :students, :comments, :text, default: "No comments yet!"
  end
end
