class StudentsController < ApplicationController
  before_action :set_student, only: [:update, :destroy, :show]
  before_action :set_s_class, except: [:destroy]

  def show
  end

  def create
    @student = Student.new(student_params)
    @student.s_class = @s_class

    if @student.save
      redirect_to s_class_path(@s_class)
    else
      render "s_classes/show", status: :unprocessable_entity
    end
  end

  def update
    @student.update(student_params)
    if @student.save
      redirect_to s_class_path(@s_class)
    else
      render "s_classes/show", status: :unprocessable_entity
    end
  end

  def destroy
    @student.destroy
    redirect_to s_class_path(@student.s_class)
  end

  private

  def set_s_class
    @s_class = SClass.find(params[:s_class_id])
  end

  def set_student
    @student = Student.find(params[:id])
  end

  def student_params
    params.require(:student).permit(:name, :kanji_name, :gender, :student_number, :comments, :photo)
  end
end
