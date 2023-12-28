require 'rails_helper'

RSpec.describe Seat, type: :model do
  it "has a row and a column as integers" do
    seat1 = build(:seat, row: "A")
    seat2 = build(:seat, column: "B")
    expect([seat1.save, seat2.save]).to eq([false, false])
  end
end
