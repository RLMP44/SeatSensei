class CreateSeats < ActiveRecord::Migration[7.1]
  def change
    create_table :seats do |t|
      t.integer :row
      t.integer :column
      t.references :student, null: false, foreign_key: true
      t.references :classroom, null: false, foreign_key: true

      t.timestamps
    end
  end
end
