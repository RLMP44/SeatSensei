require 'rails_helper'

RSpec.describe "PagesControllers", type: :request do
  it "diplays the homepage" do
    get "/"

    expect(response).to have_http_status(:ok)
  end

  context "a user who is not signed it can't see the dashboard" do
    it "doesn't display the dashboard without sign in" do
      get "/"
      expect(response).to_not include("My Students")
    end
  end
end
