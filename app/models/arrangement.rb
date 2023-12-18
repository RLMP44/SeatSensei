class Arrangement < ApplicationRecord
  belongs_to :classroom
  belongs_to :s_class

  validates :json_file, presence: true
end
