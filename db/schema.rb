# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150830195009) do

  create_table "brands", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "brands", ["name"], name: "index_brands_on_name"

  create_table "models", force: :cascade do |t|
    t.string   "name"
    t.integer  "brand_id"
    t.string   "url"
    t.string   "img"
    t.integer  "popularity",    default: 0
    t.integer  "price",         default: 0
    t.integer  "size",          default: 0
    t.integer  "camera",        default: 0
    t.integer  "ram",           default: 0
    t.integer  "battery",       default: 0
    t.integer  "ppi",           default: 0
    t.integer  "_price",        default: 0
    t.integer  "_battery",      default: 0
    t.integer  "_ppi",          default: 0
    t.float    "_size",         default: 0.0
    t.float    "_camera",       default: 0.0
    t.float    "_ram",          default: 0.0
    t.string   "title"
    t.string   "spec_sheet"
    t.string   "swf"
    t.string   "review_url"
    t.string   "features"
    t.string   "disadvantages"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  add_index "models", ["_battery"], name: "index_models_on__battery"
  add_index "models", ["_camera"], name: "index_models_on__camera"
  add_index "models", ["_ppi"], name: "index_models_on__ppi"
  add_index "models", ["_price"], name: "index_models_on__price"
  add_index "models", ["_ram"], name: "index_models_on__ram"
  add_index "models", ["_size"], name: "index_models_on__size"
  add_index "models", ["battery"], name: "index_models_on_battery"
  add_index "models", ["brand_id"], name: "index_models_on_brand_id"
  add_index "models", ["camera"], name: "index_models_on_camera"
  add_index "models", ["name"], name: "index_models_on_name"
  add_index "models", ["popularity"], name: "index_models_on_popularity"
  add_index "models", ["ppi"], name: "index_models_on_ppi"
  add_index "models", ["price"], name: "index_models_on_price"
  add_index "models", ["ram"], name: "index_models_on_ram"
  add_index "models", ["size"], name: "index_models_on_size"

end
