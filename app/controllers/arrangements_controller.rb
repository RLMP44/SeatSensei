class ArrangementsController < ApplicationController
  def create
    @arrangement = Arrangement.new(arrangement_params)
    @arrangement.classroom = params[:classroom_id]
    @arrangement.s_class = params[:s_class_id]
    @arrangement.save!
  end

  def update
    @arrangement = Arrangement.find(params[:id])
    @arrangement.update(arrangement_params)
    @arrangement.save!
  end

  private

  def arrangement_params
    params.require(:arrangement).permit(:json_file)
  end
end
