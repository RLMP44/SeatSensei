class Seat < ApplicationRecord
  belongs_to :student
  belongs_to :classroom, dependent: :destroy

  validates :row, numericality: { only_integer: true }
  validates :column, numericality: { only_integer: true }
end
