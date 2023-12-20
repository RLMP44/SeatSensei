class ClassroomsController < ApplicationController
  def show
    @classroom = Classroom.find(params[:id])
    @s_class = SClass.find(params[:id])
  end

  def create
  end

  def update
  end

  def destroy
  end
end
