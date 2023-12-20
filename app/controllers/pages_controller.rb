class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home]

  def home
    @classrooms = Classroom.where(user_id: 4)
    @s_classes = SClass.where(user_id: 4)
  end
end
