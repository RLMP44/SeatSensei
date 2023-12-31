class Student < ApplicationRecord
  belongs_to :s_class
  has_one_attached :photo
  has_one :seat

  validates :student_number, presence: true
  validates :gender, presence: true, inclusion: { in: ["Male", "Female", "Other", "Unknown"] }
  validates :name, presence: true
  validates :student_number, presence: true
  validates :points, numericality: true
end
