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
    // console.log(url)
    fetch(url).then(response => response.json()).then(studentData => {
      // console.log(studentData)
      this.detailsViewTarget.outerHTML = `<div data-controller="comments" class="student-info col-6" data-student-details-target="detailsView">
      <p>${studentData.name}</p>
      <p>${studentData.student_number}</p>
      <p>${studentData.kanji_name}</p>
      <p>${studentData.points}</p>
      <p>${studentData.comments}</p>
      <button data-action="click->comments#showCommentsForm" class="btn btn-secondary">Add/Edit Comments</button>
      <form data-comments-target="commentsForm" class="simple_form form-control d-none" id="edit_student_${studentData.id}" novalidate="novalidate" action="/s_classes/${this.classIdValue}/students/${studentData.id}" accept-charset="UTF-8" method="post"><input type="hidden" name="_method" value="patch" autocomplete="off"><input type="hidden" name="authenticity_token" value="CkjbfcP9NwI8qV9ZZidOj6UBDDsoYCkI1q1LQYYMELXsRjkfBbcO6a2ZxiXldBPsyWr6Qcgbc5ERx1znE4HYnA" autocomplete="off">
        <div class="mb-3 text optional student_comments"><label class="form-label text optional" for="student_comments">Your comments:</label><textarea class="form-control is-valid text optional" name="student[comments]" id="student_comments">No comments</textarea></div>
        <input type="submit" name="commit" value="Save Comments" data-disable-with="Save Comments">
      </form>      <!-- Button trigger edit modal -->
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdropEdit">
        Edit Student
      </button>
      <!-- Edit Modal -->
      <div class="modal fade" id="staticBackdropEdit" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabelEdit" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabelEdit">Edit Student</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form class="simple_form form-control" id="edit_student_${studentData.id}" novalidate="novalidate" enctype="multipart/form-data" action="/s_classes/${this.classIdValue}/students/${studentData.id}" accept-charset="UTF-8" method="post"><input type="hidden" name="_method" value="patch" autocomplete="off"><input type="hidden" name="authenticity_token" value="AMNGwvPiS0qOeKzMZQ9eJhsXgdEqJ73lKniLs_md5DLmzaSgNahyoR9INbDmXANFd3x3q8pc53ztEpwVbBAsGw" autocomplete="off">
      <div class="mb-3 string required student_name"><label class="form-label string required" for="student_name">Name <abbr title="required">*</abbr></label><input class="form-control is-valid string required" type="text" value="${studentData.name}" name="student[name]" id="student_name"></div>
      <div class="mb-3 string optional student_kanji_name"><label class="form-label string optional" for="student_kanji_name">Kanji name</label><input class="form-control is-valid string optional" type="text" value="${studentData.kanji_name}" name="student[kanji_name]" id="student_kanji_name"></div>
      <div class="mb-3 select required student_gender"><label class="form-label select required" for="student_gender">Gender <abbr title="required">*</abbr></label><select class="form-select is-valid select required" name="student[gender]" id="student_gender"><option value="" label=" "></option>
      <option selected="selected" value="${studentData.gender}">${studentData.gender}</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
      <option value="Unknown">Unknown</option></select></div>
      <div class="mb-3 string required student_student_number"><label class="form-label string required" for="student_student_number">Student number <abbr title="required">*</abbr></label><input class="form-control is-valid string required" type="text" value="${studentData.student_number}" name="student[student_number]" id="student_student_number"></div>
      <div class="mb-3 file optional student_photo"><label class="form-label file optional" for="student_photo">Photo</label><input class="form-control file optional" type="file" name="student[photo]" id="student_photo"></div>
      <input type="submit" name="commit" value="Save Student" data-disable-with="Save Student">
      </form>
            </div>
          </div>
        </div>
      </div>
      <a class="btn btn-warning" data-turbo-method="delete" data-turbo-confirm="Are you sure?" href="/s_classes/${this.classIdValue}/students/${studentData.id}">Remove Student</a>
      </div>`

    })
  }
}
