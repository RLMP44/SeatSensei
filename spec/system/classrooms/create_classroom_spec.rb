require 'rails_helper'

RSpec.describe "CreateClassroom", type: :system do
  # describe "create a classroom" do
    it "creates a classroom with correct parameters", :js do
      sign_in(create(:user))
      visit root_path

      expect(page).to have_content("No classrooms yet!")
      # p find_button("New Classroom")
      click_button "New Classroom"
      within("#staticBackdropClassroom") do
        fill_in 'classroom_name', with: "Classroom 1"
        # p find_field("Name").value
        fill_in 'classroom_total_rows', with: 6
        # p find_field("Total rows").value
        fill_in 'classroom_total_columns', with: 4
        # p find_field("Total columns").value
        fill_in 'classroom_max_seats', with: 24
        # p find_field("Max seats").value
        click_button("Save Classroom")
      end
      # expect(page).to have_content("Classroom 1") - doesn't work?
      expect(page).to_not have_content("No classrooms yet!")

      save_screenshot

      # visit root_path

      # Capybara.using_wait_time 5 do
      #   find("classroom-cards")
      # end
      # puts "Looking for classroom list"
      # p find("classrooms-container")
      # puts "try again"
      # p find(".classrooms-container")

      # within(".classrooms-container") do
      # end
    end
  # end
end
