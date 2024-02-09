class ArrangementsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @arrangement = Arrangement.new
    @arrangement.classroom = Classroom.find(params[:classroom_id])
    # json_params = JSON.parse(request.raw_post)
    @arrangement.s_class = SClass.find(params[:s_class_id])
    @arrangement.save!

    head :no_content
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
