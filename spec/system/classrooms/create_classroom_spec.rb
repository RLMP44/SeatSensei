require 'rails_helper'

RSpec.describe "CreateClassroom", type: :system do
  describe "create a classroom" do
    it "creates a classroom with correct parameters" do
      sign_in(create(:user))
      visit root_path
      click_button "New Classroom"

      expect(page).to have_content("Add a new classroom") # might be useless
      expect(Classroom.count).to eq(0)

      fill_in 'Name', with: "New Classroom"
      fill_in 'Total rows', with: 6
      fill_in 'Total columns', with: 4
      fill_in 'Max seats', with: 24

      click_button "Save Classroom"

      expect(page).to have_content("Classroom was successfully created.")
      expect(Classroom.count).to eq(1)
      expect(Classroom.last.name).to eq("New Classroom")
    end
  end
end
