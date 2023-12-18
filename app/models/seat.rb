class Seat < ApplicationRecord
  belongs_to :student
  belongs_to :classroom, dependent: :destroy

  validates :row, numericality: true
  validates :column, numericality: true
end
