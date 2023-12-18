class SClass < ApplicationRecord
  belongs_to :user
  has_many :students

  validates :year, presence: true, numericality: true
  validates :kumi, presence: true
end
