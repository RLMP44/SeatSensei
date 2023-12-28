class SClassesController < ApplicationController
  before_action :set_s_class, only: [:show, :destroy]

  def show
    @students = Student.where(s_class: @s_class)
    @student = Student.new
  end

  def create
  end

  def destroy
  end

  def redirect_to_classroom
    classroom = Classroom.find(params[:classroom][:classroom_id])
    redirect_to classroom_path(classroom, s_class_id: params[:s_class_id])
  end

  private

  def set_s_class
    @s_class = SClass.find(params[:id])
  end
end
