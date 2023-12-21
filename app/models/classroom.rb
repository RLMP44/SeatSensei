class Classroom < ApplicationRecord
  belongs_to :user

  validates :name, presence: true, uniqueness: true
  validates :total_rows, presence: true, numericality: { only_integer: true }
  validates :total_columns, presence: true, numericality: { only_integer: true }
  validates :max_seats, numericality: { only_integer: true }
end
