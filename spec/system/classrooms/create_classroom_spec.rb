require 'rails_helper'

RSpec.describe "CreateClassroom", type: :system do
  describe "create a classroom" do
    it "creates a classroom with correct parameters" do
      sign_in(create(:user))
      visit root_path

      expect(Classroom.count).to eq(0)
      expect(page).to have_content("No classrooms yet!")

      click_button "New Classroom"
      within("#staticBackdropClassroom") do
        fill_in 'Name', with: "New Classroom"
        fill_in 'Total rows', with: 6
        fill_in 'Total columns', with: 4
        fill_in 'Max seats', with: 24
        click_button "Save Classroom"
      end

      # visit root_path

      # Capybara.using_wait_time 5 do
      #   find("classroom-cards")
      # end

      find("classroom-cards")
      within("classroom-cards") do
        expect(page).to have_content("New Classroom")
      end

      expect(Classroom.count).to eq(1)
      expect(Classroom.last.name).to eq("New Classroom")
    end
  end
end
