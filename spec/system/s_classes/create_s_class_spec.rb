require 'rails_helper'

RSpec.describe "CreateClassroom", type: :system do
  it "creates a class with correct parameters", js: true do
    sign_in(create(:user))
    visit root_path

    expect(SClass.count).to eq(0)

    expect(page).to have_content("No classes uploaded yet!")
    click_button "New Class"
    within("#staticBackdropClass") do
      fill_in 'Year', with: 3
      fill_in 'Kumi', with: "A"
      fill_in 'Subject', with: "English"
      fill_in 'Schedule', with: '2nd period'
      click_button("Save Class")
    end

    expect(page).to have_content("Year 3, Kumi A")

    expect(SClass.count).to eq(1)

    # save_screenshot
  end
end
