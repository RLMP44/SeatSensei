class Classroom < ApplicationRecord
  belongs_to :user

  validates :name, presence: true, uniqueness: true
  validates :total_rows, presence: true, numericality: true
  validates :total_columns, presence: true, numericality: true
  validates :max_seats, numericality: true
end
