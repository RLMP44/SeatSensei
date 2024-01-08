import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="comments"
export default class extends Controller {
  static targets = ["commentsForm"]

  connect() {
    console.log("hello from comments!")
  }

  showCommentsForm() {
    this.commentsFormTarget.classList.toggle("d-none")
  }
}
