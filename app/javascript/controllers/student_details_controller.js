import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="student-details"
export default class extends Controller {
  // static targets = ["detailsView", "studentName"]
  // static values = {"classId": Number}

  // connect() {
  //   console.log("hello from student view!")
  //   // console.log(this.detailsViewTarget)
  // }

  // viewStudent(event) {
  //   // console.log(event.target)
  //   // console.log(event.target.dataset.id)
  //   // creating an html parser
  //   const parser = new DOMParser()
  //   const studentId = event.target.dataset.id
  //   const url = `http://127.0.0.1:3000/s_classes/${this.classIdValue}/students/${studentId}`
  //   // console.log(url)
  //   // getting an html response and parsing it
  //   fetch(url).then(response => response.text()).then(data => {
  //     const studentData = parser.parseFromString(data, 'text/html')
  //     // console.log(studentData.querySelector(".student-info"))
  //     const studentDetails = studentData.querySelector(".student-info")
  //     this.detailsViewTarget.replaceChildren(studentDetails)
  //    })
  // }
}
