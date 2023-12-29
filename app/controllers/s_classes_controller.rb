class SClassesController < ApplicationController
  before_action :set_s_class, only: [:show, :destroy]

  def show
    @students = Student.where(s_class: @s_class)
    @student = Student.new
    @classrooms = Classroom.where(user: current_user)
  end

  def create
    @s_class = SClass.new(s_class_params)
    @s_class.user = current_user

    if @s_class.save
      redirect_to s_class_path(@s_class)
    else
      render "pages/home", status: :unprocessable_entity
    end
  end

  def destroy
    @s_class.destroy
    redirect_to root_path
  end

  def redirect_to_classroom
    classroom = Classroom.find(params[:classroom][:classroom_id])
    redirect_to classroom_path(classroom, s_class_id: params[:s_class_id])
  end

  private

  def s_class_params
    params.require(:s_class).permit(:name, :year, :kumi, :subject, :schedule)
  end

  def set_s_class
    @s_class = SClass.find(params[:id])
  end
end
