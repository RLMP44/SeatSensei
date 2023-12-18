class CreateClassrooms < ActiveRecord::Migration[7.1]
  def change
    create_table :classrooms do |t|
      t.string :name
      t.integer :total_rows
      t.integer :total_columns
      t.integer :max_seats
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
