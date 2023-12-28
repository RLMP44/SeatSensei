require 'rails_helper'

RSpec.describe 'User Login', type: :system do
  let(:michael) { create :user }

  it 'allows a user to log in' do
    visit "/users/sign_in"

    fill_in 'Email', with: michael.email
    fill_in 'Password', with: 'michaeliscool'

    click_button "Log in"

    expect(page).to have_content("Signed in successfully.")
  end

  it "doesn't allow a user with wrong credentials to sign in" do
    visit "/users/sign_in"

    fill_in 'Email', with: michael.email
    fill_in 'Password', with: 'michaelisnotcool'

    click_button "Log in"

    expect(page).to have_content("Invalid Email or password.")
  end
end
