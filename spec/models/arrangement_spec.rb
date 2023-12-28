require 'rails_helper'

RSpec.describe Arrangement, type: :model do
  let(:michael) { create :user }

  let(:class1) do
    SClass.create!(year: 1, kumi: "A", user: michael)
  end

  let(:classroom1) do
    Classroom.create!(name: "New Classroom", total_rows: 6, total_columns: 4, max_seats: 24, user: michael)
  end

  it "has a json attached as a string" do
    arrangement = Arrangement.new(json_file: nil, s_class: class1, classroom: classroom1)
    expect(arrangement.save).to eq(false)
  end
end
