
class CreateModels < ActiveRecord::Migration
  def change
    create_table :models do |t|
      t.string :name
      t.references :brand, index: true, foreign_key: true
      t.string :url
      t.string :img
      t.integer :price, :size, :camera, :ram, :battery, :ppi, index: true, default: 0
      t.integer :_price, :_battery, :_ppi, index: true, default: 0
      t.float :popularity, :_size, :_camera, :_ram, index: true, default: 0.0, precision: 2, scale: 1
      t.string :title, :spec_sheet, :swf, :review_url, :features, :disadvantages, default: nil

      t.timestamps null: false
    end
    add_index :models, :name
  end
end
