class PhonesController < ApplicationController

  def index
    @models = Model.order(popularity: :desc).limit(7)
  end

  def json_model
    render json: Model.order(popularity: :desc).offset(params[:offset]).limit(7).to_json
  end


  def search
    @models = []
    m = nil

    case params[:media_user]
    when "1"
      m = Model.decent_media
    when "2"
      m = Model.hardcore_media
    when "0"
      m = Model.any_media
    end

    if params[:price].present?
      @models << m.where("features like '%#{params[:feature]}%'").where("_price < #{params[:price].to_i + 500}").randomize
    else
      @models << m.where("features like '%#{params[:feature]}%'").randomize
    end

    case params[:game_user]
    when "1"
      m = Model.casual_gamer
    when "2"
      m = Model.hardcore_gamer
    when "0"
      m = Model.any_gamer
    end

    if params[:price].present?
      @models << m.where("features like '%#{params[:feature]}%'").where("_price < #{params[:price].to_i + 500}").randomize
    else
      @models << m.where("features like '%#{params[:feature]}%'").randomize
    end

    case params[:multitask_user]
    when "1"
      m = Model.casual_multitask
    when "2"
      m = Model.hardcore_multitask
    when "0"
      m = Model.any_multitask
    end

    if params[:price].present?
      @models << m.where("features like '%#{params[:feature]}%'").where("_price < #{params[:price].to_i + 500}").randomize
    else
      @models << m.where("features like '%#{params[:feature]}%'").randomize
    end
    @models.flatten!
    render json: @models.to_json
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
