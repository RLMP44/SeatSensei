require 'rails_helper'

RSpec.describe Arrangement, type: :model do
  let(:new_class) { create :s_class }
  let(:new_classroom) { create :classroom }

  it "has a json attached as a string" do
    arrangement = Arrangement.new(json_file: nil, s_class: new_class, classroom: new_classroom)
    expect(arrangement.save).to eq(false)
  end
end
