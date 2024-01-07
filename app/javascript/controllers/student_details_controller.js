import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="student-details"
export default class extends Controller {
  static targets = ["detailsView", "studentName"]
  static values = {"classId": Number}

  connect() {
    console.log("hello from student view!")
    // console.log(this.detailsViewTarget)
  }

  viewStudent(event) {
    // console.log(event.target)
    // console.log(event.target.dataset.id)
    const studentId = event.target.dataset.id
    const url = `http://127.0.0.1:3000/s_classes/${this.classIdValue}/students/${studentId}`
    console.log(url)
    fetch(url).then(response => response.json()).then(studentData => {
      this.detailsViewTarget.outerHTML = `<div class="student-info col-6" data-student-details-target="detailsView">
      <p>${studentData.name}</p>
      <p>${studentData.student_number}</p>
      <p>${studentData.kanji_name}</p>
      <p>${studentData.points}</p>
      <p>${studentData.comments}</p>
      <a data-turbo-method="delete" data-turbo-confirm="Are you sure?" href="/s_classes/${this.classIdValue}/students/${studentData.id}">Remove</a>
    </div>`
    })
  }
}
