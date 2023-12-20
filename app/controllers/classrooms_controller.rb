class ClassroomsController < ApplicationController
  def show
    @classroom = Classroom.find(params[:id])
    @s_class = SClass.find(params[:id])
    @arrangement = @classroom.arrangement
  end

  def create
  end

  def update
  end

  def destroy
  end
end
