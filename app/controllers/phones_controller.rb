class PhonesController < ApplicationController

  def index
    @models = Model.order(popularity: :desc)
  end

  def json_model
    render json: Model.order(popularity: :desc).offset(params[:offset]).limit(7).to_json
  end


  def search
    @models = []
    price = params[:price]
    features = params[:feature]

    case params[:media_user]
    when "1"
      @models << Model.check(Model.decent_media.limit(3), price, features)
    when "2"
      @models << Model.check(Model.hardcore_media.limit(3), price, features)
    when "0"
      @models << Model.check(Model.any_media.limit(3), price, features)
    end

    # if params[:price].present?
    #   @models << m.where("features like '%#{params[:feature]}%'").where("_price < #{params[:price].to_i + 1500}").limitize if m
    # else
    #   @models << m.where("features like '%#{params[:feature]}%'").limitize if m
    # end

    case params[:game_user]
    when "1"
      @models << Model.check(Model.casual_gamer.limit(3), price, features)
    when "2"
      @models << Model.check(Model.hardcore_gamer.limit(3), price, features)
    when "0"
      @models << Model.check(Model.any_gamer.limit(3), price, features)
    end

    # if params[:price].present?
    #   @models << m.where("features like '%#{params[:feature]}%'").where("_price < #{params[:price].to_i + 1500}").limitize if m
    # else
    #   @models << m.where("features like '%#{params[:feature]}%'").limitize if m
    # end

    case params[:multitask_user]
    when "1"
      @models << Model.check(Model.casual_multitask.limit(3), price, features)
    when "2"
      @models << Model.check(Model.hardcore_multitask.limit(3), price, features)
    when "0"
      @models << Model.check(Model.any_multitask.limit(3), price, features)
    end

    # if params[:price].present?
    #   @models << m.where("features like '%#{params[:feature]}%'").where("_price < #{params[:price].to_i + 1500}").limitize if m
    # else
    #   @models << m.where("features like '%#{params[:feature]}%'").limitize if m
    # end
    @models.flatten!
    @models = @models.size < 1 ? Model.check(Model, price, features) : @models
    # @models = @models.sort{|a,b| b[:popularity] <=> a[:popularity]}
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
