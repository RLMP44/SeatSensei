class Arrangement < ApplicationRecord
  belongs_to :classroom
  belongs_to :s_class


  def is_new
    json_file.nil?
  end
end
