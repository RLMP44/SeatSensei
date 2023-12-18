class CreateSClasses < ActiveRecord::Migration[7.1]
  def change
    create_table :s_classes do |t|
      t.integer :year
      t.string :kumi
      t.string :subject
      t.string :schedule
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
