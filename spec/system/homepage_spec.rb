require 'rails_helper'

RSpec.describe "Homepage", type: :system do
  it "diplays the homepage" do
    visit root_path
    expect(page).to have_content("Seating made simple - Seat Sensei, the master of organized seating")
  end

  context "a user who is not signed it can't see the dashboard" do
    it "doesn't display the dashboard without sign in" do
      visit root_path
      expect(page).to_not have_content("My Students")
    end
  end
end
