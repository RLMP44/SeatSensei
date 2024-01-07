import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="student-details"
export default class extends Controller {
  static targets = ["detailsView", "studentName"]

  connect() {
    console.log("hello from student view!")
    console.log(this.detailsViewTarget)
  }

  viewStudent(event) {
    console.log(event.target)
    console.log(event.target.dataset.id)
  }
}
