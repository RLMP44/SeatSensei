class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home]

  def home
    @user = current_user
    @classrooms = @user.classrooms
    @s_classes = @user.s_classes
  end
end
