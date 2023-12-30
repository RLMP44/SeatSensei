class ClassroomsController < ApplicationController
  before_action :set_classroom, only: [:show, :update, :destroy]

  def show
    @s_class = SClass.find(params[:s_class_id])
    if @classroom.arrangements.present?
      @arrangement = @classroom.arrangements.where(s_class: @s_class)
    else
      @arrangement = Arrangement.new
    end
  end

  def create
    @classroom = Classroom.new(classroom_params)
    @classroom.user = current_user

    if @classroom.save
      redirect_to root_path
    else
      render "pages/home", status: :unprocessable_entity
    end
  end

  def update
    @classroom.update(classroom_params)
    if @classroom.save
      redirect_to classroom_path(@classroom)
    else
      render root_path, status: :unprocessable_entity
    end
  end

  def destroy
    @classroom.destroy
    redirect_to root_path
  end

  private

  def classroom_params
    params.require(:classroom).permit(:name, :total_rows, :total_columns, :max_seats)
  end

  def set_classroom
    @classroom = Classroom.find(params[:id])
  end
end
