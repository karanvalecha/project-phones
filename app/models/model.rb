class Model < ActiveRecord::Base
  belongs_to :brand

  # enum camera: %w(cl cm ch)
  # enum display: %w(dl dm dh)
  # enum battery: %w(bl bm bh)
  # enum memory: %w(ml mm mh)
  # enum ppi: %w(pl pm ph)
  scope :decent_media, -> {where(camera: 0, ram: 0)}
  scope :hardcore_media, -> {where(camera: 1, ram:1, size: 1).where("_price > 17000")}
  scope :any_media, -> {where.not(camera: -1, price: 1)}

  scope :casual_gamer, -> {where(ram: 0, size: 0)}
  scope :hardcore_gamer, -> {where(ram: 1, size: 1, battery: 1).where("_price > 17000")}
  scope :any_gamer, -> {where.not(ram: -1, price: 1)}

  scope :casual_multitask, ->{where(ram: 0, battery: 0)}
  scope :hardcore_multitask, ->{where(ram: 1, battery: 1, ppi: 1).where("_price > 17000")}
  scope :any_multitask, -> {where.not(size: -1, price: 1)}


  scope :randomize, ->{order(price: :desc, popularity: :desc, features: :desc).limit(3)}


  def to_s
    puts name
  end

  (1..3).each do |action|
    define_method("price_#{action}") do
      _price.round(-action).to_s
    end
  end

end
