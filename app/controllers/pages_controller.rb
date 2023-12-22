class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home]

  def home
    @classrooms = Classroom.where(user: current_user)
    @s_classes = SClass.where(user: current_user)
    @s_class = SClass.new
    @classroom = Classroom.new
  end
end
