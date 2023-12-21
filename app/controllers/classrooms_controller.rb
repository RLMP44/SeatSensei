class ClassroomsController < ApplicationController
  def show
    @classroom = Classroom.find(params[:id])
    @s_class = SClass.find(params[:s_class_id])
    if @classroom.arrangements.present?
      @arrangement = @classroom.arrangements.where(s_class: @s_class)
    else
      @arrangement = Arrangement.new
    end
  end

  def create
  end

  def update
  end

  def destroy
  end
end
