class PhonesController < ApplicationController

  def index
    @models = Model.order(popularity: :desc).limit(3)
  end

  def json_model
    render json: Model.order(popularity: :desc)
  end


  def search
    @models = []

    case params[:media_user]
    when "1"
      @models << Model.decent_media.where("features like '%#{params[:feature]}%'").randomize
    when "2"
      @models << Model.hardcore_media.where("features like '%#{params[:feature]}%'").randomize
    when "0"
      @models << Model.where("features like '%#{params[:feature]}%'").randomize
    end

    case params[:game_user]
    when "1"
      @models << Model.casual_gamer.where("features like '%#{params[:feature]}%'").randomize
    when "2"
      @models << Model.hardcore_gamer.where("features like '%#{params[:feature]}%'").randomize
    when "0"
      @models << Model.where("features like '%#{params[:feature]}%'").randomize
    end

    case params[:multitask_user]
    when "1"
      @models << Model.casual_multitask.where("features like '%#{params[:feature]}%'").randomize
    when "2"
      @models << Model.hardcore_multitask.where("features like '%#{params[:feature]}%'").randomize
    when "0"
      @models << Model.where("features like '%#{params[:feature]}%'").randomize
    end
    @models.flatten!
    render json: @models
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_phone
      @phone = Phone.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def phone_params
      params.require(:model).permit(:name)
    end
end
