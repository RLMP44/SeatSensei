import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="student-details"
export default class extends Controller {
  static targets = ["detailsView", "studentName", "studentDetails"]
  // static values = {"classId": Number}

  connect() {
    console.log("hello from student view!")
    // console.log(this.detailsViewTarget)
    this.detailsViewTarget.firstElementChild.classList.remove('d-none')
  }

  viewStudent(event) {
    // // console.log(event.target)
    // // console.log(event.target.dataset.id)
    // // creating an html parser
    // const parser = new DOMParser()
    // const studentId = event.target.dataset.id
    // const url = `http://127.0.0.1:3000/s_classes/${this.classIdValue}/students/${studentId}`
    // // console.log(url)
    // // getting an html response and parsing it
    // fetch(url).then(response => response.text()).then(data => {
    //   const studentData = parser.parseFromString(data, 'text/html')
    //   // console.log(studentData.querySelector(".student-info"))
    //   const studentDetails = studentData.querySelector(".student-info")
    //   this.detailsViewTarget.replaceChildren(studentDetails)
    //  })

    // console.log(this.detailsViewTarget.children)
    Array.from(this.detailsViewTarget.children).forEach((student) => {
      student.classList.add('d-none')
    })
    const selectedId = event.target.getAttribute('data-id')
    const filter = Array.prototype.filter
    const selectedStudent = filter.call(this.detailsViewTarget.children, function(student) {
      return selectedId === student.id
    })[0]
    selectedStudent.classList.remove('d-none')
  }
}
