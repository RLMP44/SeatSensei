require 'rails_helper'

RSpec.describe Classroom, type: :model do
  let(:michael) { create :user }

  it "has a unique name" do
    Classroom.create!(name: "New Classroom", total_rows: 5, total_columns: 5, max_seats: 25, user: michael)
    new_classroom = Classroom.new(name: "New Classroom", total_rows: 6, total_columns: 4, max_seats: 24, user: michael)
    expect(new_classroom.save).to eq(false)
  end

  it "has a number of rows as an integer" do
    new_classroom = Classroom.new(name: "Classroom 3A", total_rows: "A", total_columns: 5, max_seats: 25, user: michael)
    expect(new_classroom.save).to eq(false)
  end

  it "has a number of columns as an integer" do
    new_classroom = Classroom.new(name: "Classroom 3A", total_rows: 5, total_columns: "B", max_seats: 25, user: michael)
    expect(new_classroom.save).to eq(false)
  end
end
