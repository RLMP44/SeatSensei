require 'rails_helper'

RSpec.describe SClass, type: :model do
  it "has a year as a single integer" do
    new_class1 = build(:s_class, year: "B")
    new_class2 = build(:s_class, year: 32)
    expect([new_class1.save, new_class2.save]).to eq([false, false])
  end

  it "has a kumi" do
    new_class = build(:s_class, kumi: nil)
    expect(new_class.save).to eq(false)
  end
end
