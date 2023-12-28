require 'rails_helper'

RSpec.describe SClass, type: :model do
  let(:michael) { create :user }

  it "has a year as a single integer" do
    new_class1 = SClass.new(year: "B", kumi: "A", user: michael)
    new_class2 = SClass.new(year: 32, kumi: "A", user: michael)
    expect([new_class1.save, new_class2.save]).to eq([false, false])
  end
  it "has a kumi" do
    new_class = SClass.new(year: 3, kumi: nil, user: michael)
    expect(new_class.save).to eq(false)
  end
end
