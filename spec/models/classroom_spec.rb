require 'rails_helper'

RSpec.describe Classroom, type: :model do
  it "has a unique name" do
    create(:classroom)
    new_classroom = build(:classroom)
    expect(new_classroom.save).to eq(false)
  end

  it "has a number of rows as an integer" do
    new_classroom = build(:classroom, total_rows: "A")
    expect(new_classroom.save).to eq(false)
  end

  it "has a number of columns as an integer" do
    new_classroom = build(:classroom, total_columns: "B")
    expect(new_classroom.save).to eq(false)
  end

  it "creates a classroom with correct parameters" do
    classroom = build(:classroom)
    expect(classroom.save).to eq(true)
  end
end
