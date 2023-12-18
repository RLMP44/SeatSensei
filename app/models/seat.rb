class Seat < ApplicationRecord
  belongs_to :student
  belongs_to :classroom

  validates :row, numericality: true
  validates :column, numericality: true
end
