require 'rails_helper'

RSpec.describe User, type: :model do
  it "has a username with at least 2 characters" do
    new_user = User.new(email: "me@me.com", password: "123456789", username: "i")
    expect(new_user.save).to eq(false)
  end
end
