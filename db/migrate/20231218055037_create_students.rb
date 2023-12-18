class CreateStudents < ActiveRecord::Migration[7.1]
  def change
    create_table :students do |t|
      t.string :name
      t.string :kanji_name
      t.string :gender
      t.integer :points, default: 0
      t.string :student_number
      t.text :comments
      t.references :s_class, null: false, foreign_key: true

      t.timestamps
    end
  end
end
