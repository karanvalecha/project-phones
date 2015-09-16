class Brand < ActiveRecord::Base
  has_many :models, dependent: :delete_all

private
  def to_s
    name
  end
end
