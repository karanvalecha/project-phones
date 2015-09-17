class ChangePopularityToFloat < ActiveRecord::Migration
  def change
    change_table :models do |t|
      t.change :popularity, :float, index: true, default: 0.0, precision: 2, scale: 1
    end
  end
end
