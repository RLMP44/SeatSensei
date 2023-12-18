class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :s_classes
  has_many :students, through: :s_classes
  has_many :classrooms

  validates :username, presence: true, length: { minimum: 2 }
end
