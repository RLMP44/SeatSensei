class SClass < ApplicationRecord
  belongs_to :user
  has_many :students
  has_many :arrangements

  validates :year, presence: true, numericality: { only_integer: true }, length: { maximum: 1 }
  validates :kumi, presence: true
end
