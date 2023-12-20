require 'rails_helper'

RSpec.describe Arrangement, type: :model do
  it "has a json attached as a string" do
    michael = User.create!(username: "michael", password: "michaeliscool", email: "michael@michael.com")
    class1 = SClass.create!(year: 1, kumi: "A", user: michael)
    classroom1 = Classroom.create!(name: "New Classroom", total_rows: 6, total_columns: 4, max_seats: 24, user: michael)
    arrangement = Arrangement.new(json_file: nil, s_class: class1, classroom: classroom1)
    expect(arrangement.save).to eq(false)
  end
end
