class Model < ActiveRecord::Base
  belongs_to :brand

  attr_reader :full_name

  @@like = Rails.env.production? ? "ilike" : "like"  #For Postgres non case-sensitive like operator in production


  # enum camera: %w(cl cm ch)
  # enum display: %w(dl dm dh)
  # enum battery: %w(bl bm bh)
  # enum memory: %w(ml mm mh)
  # enum ppi: %w(pl pm ph)
  scope :decent_media, -> {where.not(camera: -1, ram: -1).order(popularity: :desc)}
  scope :hardcore_media, -> {where(camera: 1, ram:1, size: 1).order(_camera: :desc)}
  scope :any_media, -> {where.not(camera: 1, price: 1).order(:price, popularity: :desc)}

  scope :casual_gamer, -> {where.not(ram: -1, size: -1).order(_ram: :desc)}
  scope :hardcore_gamer, -> {where(ram: 1, size: 1, battery: 1).order(popularity: :desc)}
  scope :any_gamer, -> {where.not(ram: 1, price: 1).order(:price, popularity: :desc)}

  scope :casual_multitask, ->{where.not(ram: -1, battery: -1).order(_ppi: :desc)}
  scope :hardcore_multitask, ->{where(ram: 1, battery: 1, ppi: 1).order(popularity: :desc)}
  scope :any_multitask, -> {where.not(size: 1, price: 1).order(:price, popularity: :desc)}


  scope :limitize, ->{limit(3)}

  def full_name
    self.brand.name + " #{self.name}"
  end

  def Model.check(model, price, feature)
    if price.to_i > 0
      model.where("features #{@@like} '%#{feature}%'").where("_price < #{price.to_i + 1500}").order(_price: :desc)
    else
      model.where("features #{@@like} '%#{feature}%'").order(:_price)
    end
  end
  def to_s
    puts name
  end


#  (1..3).each do |action|
#    define_method("price_#{action}") do
#      _price.round(-action).to_s
#    end
#  end // meta-programming to round off amount

end
