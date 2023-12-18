class CreateArrangements < ActiveRecord::Migration[7.1]
  def change
    create_table :arrangements do |t|
      t.string :json_file
      t.references :classroom, null: false, foreign_key: true
      t.references :s_class, null: false, foreign_key: true

      t.timestamps
    end
  end
end
