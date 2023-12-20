# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2023_12_18_055116) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "arrangements", force: :cascade do |t|
    t.string "json_file"
    t.bigint "classroom_id", null: false
    t.bigint "s_class_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["classroom_id"], name: "index_arrangements_on_classroom_id"
    t.index ["s_class_id"], name: "index_arrangements_on_s_class_id"
  end

  create_table "classrooms", force: :cascade do |t|
    t.string "name"
    t.integer "total_rows"
    t.integer "total_columns"
    t.integer "max_seats"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_classrooms_on_user_id"
  end

  create_table "s_classes", force: :cascade do |t|
    t.integer "year"
    t.string "kumi"
    t.string "subject"
    t.string "schedule"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_s_classes_on_user_id"
  end

  create_table "seats", force: :cascade do |t|
    t.integer "row"
    t.integer "column"
    t.bigint "student_id", null: false
    t.bigint "classroom_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["classroom_id"], name: "index_seats_on_classroom_id"
    t.index ["student_id"], name: "index_seats_on_student_id"
  end

  create_table "students", force: :cascade do |t|
    t.string "name"
    t.string "kanji_name"
    t.string "gender"
    t.integer "points", default: 0
    t.string "student_number"
    t.text "comments"
    t.bigint "s_class_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["s_class_id"], name: "index_students_on_s_class_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "username", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "arrangements", "classrooms"
  add_foreign_key "arrangements", "s_classes"
  add_foreign_key "classrooms", "users"
  add_foreign_key "s_classes", "users"
  add_foreign_key "seats", "classrooms"
  add_foreign_key "seats", "students"
  add_foreign_key "students", "s_classes"
end
