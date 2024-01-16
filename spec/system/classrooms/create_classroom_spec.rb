require 'rails_helper'

RSpec.describe "CreateClassroom", type: :system do
  it "creates a classroom with correct parameters", :js do
    sign_in(create(:user))
    visit root_path

    expect(Classroom.count).to eq(0)

    expect(page).to have_content("No classrooms yet!")

    click_button "New Classroom"
    within("#staticBackdropClassroom") do
      fill_in "Name", with: "Classroom 1"
      # p find_field("Name").value
      fill_in "Total rows", with: 6
      # p find_field("Total rows").value
      fill_in "Total columns", with: 4
      # p find_field("Total columns").value
      fill_in "Max seats", with: 24
      # p find_field("Max seats").value
      click_button("Save Classroom")
    end

    expect(page).to have_content("Classroom 1")

    expect(Classroom.count).to eq(1)

    # save_screenshot

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
end
