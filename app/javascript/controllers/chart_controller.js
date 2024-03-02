import { Controller } from "@hotwired/stimulus"


export default class extends Controller {

  static targets = ["form", 'studentList']
  static values = { "students": String }

  connect() {
    this.cells = this.element.querySelectorAll('td')
    this.filter = Array.prototype.filter

    if (this.formTarget.getAttribute('data-new') === "true") {
      fetch(this.formTarget.action, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-type": "application/json" },
        body: JSON.stringify({s_class_id: this.formTarget.querySelector('#arrangement_s_class_id').value})
      }).then(response => response.text()).then(console.log(data)).catch (error => {
          console.log(error)
        })
    } else {
      const students_array = JSON.parse(this.studentsValue).students
      students_array.forEach((student) => {
        Array.from(this.studentListTarget.children).forEach((child) => {
          if (child.getAttribute('data-student') === student.student_id) {
            child.classList.add('d-none')
          }
        })
        this.cells.forEach((cell) => {
          if ((cell.cellIndex === parseInt(student.col, 10)) && (cell.parentElement.rowIndex === parseInt(student.row, 10))) {
            switch (student.gender) {
              case 'Male':
                cell.style.backgroundColor = 'lightblue'
                break
              case 'Female':
                cell.style.backgroundColor = 'pink'
                break
              case 'Other':
                cell.style.backgroundColor = 'lightgreen'
                break
              case 'Unknown':
                cell.style.backgroundColor = 'lightgray'
                break
            }
            cell.innerText = student.name
            cell.setAttribute('data-row', student.row)
            cell.setAttribute('data-col', student.col)
            cell.setAttribute('data-student', student.student_id)
          }
        })
      })
    }
  }

  onDragStart(event) {
    let hash

    if (event.target.classList.contains("s-class-cards")) {
      hash = {
        row: null,
        col: null,
        student_id: event.target.getAttribute('data-student'),
        color: event.target.style.backgroundColor,
        name: event.target.innerText
      }
    } else {
      hash = {
        row: event.target.parentElement.rowIndex,
        col: event.target.cellIndex
      }
    }

    const data = JSON.stringify(hash)
    event.dataTransfer.setData('application/drag-key', data)
    event.dataTransfer.effectAllowed = 'move'
  }

  onDragOver(event) {
    event.preventDefault()
    return true
  }

  onDragEnter(event) {
    event.preventDefault()
  }

  getPosition(element) {
    return [element.parentElement.rowIndex, element.cellIndex]
  }

  getPositions() {
    const seatsArray = []
    this.cells.forEach((seat) => {
      if (seat.getAttribute('data-student') !== "") {
        seatsArray.push({
          student_id: seat.getAttribute('data-student'),
          row: this.getPosition(seat)[0],
          col: this.getPosition(seat)[1],
          name: seat.innerText,
          gender: this.getGender(seat)
        })
      }
    })
    return seatsArray
  }

  getGender(seat) {
    switch (seat.style.backgroundColor) {
      case 'lightblue':
        return 'Male'
        break
      case 'pink':
        return 'Female'
        break
      case 'lightgreen':
        return 'Other'
        break
      case 'lightgray':
        return 'Unknown'
        break
    }

  }

  setPosition(seat, [row, col]) {
    // seat = element, [row, col] = the position it should move to
    const filter = Array.prototype.filter
    const table = seat.parentElement.parentElement
    const rows = table.children

    const newRow = filter.call(rows, function(aRow) {return aRow.rowIndex === row})[0]
    const newCell = filter.call(newRow.children, function(aCol) {return aCol.cellIndex === col})[0]

    const oldText = newCell.innerText
    const oldColor = newCell.style.backgroundColor

    newCell.innerText = seat.innerText
    newCell.style.backgroundColor = seat.style.backgroundColor
    const new_student_id = seat.getAttribute('data-student')
    const old_student_id = newCell.getAttribute('data-student')
    newCell.setAttribute('data-student', new_student_id)
    seat.setAttribute('data-student', old_student_id)


    seat.innerText = oldText
    seat.style.backgroundColor = oldColor

    seat.setAttribute('data-row', row)
    seat.setAttribute('data-col', col)
  }

  swap(seat1, seat2) {
    const seat2Pos = this.getPosition(seat2)
    this.setPosition(seat1, seat2Pos)
  }

  save(data) {
    const url = `${this.formTarget.action}`
    this.formTarget.querySelector('#arrangement_json_file').value = JSON.stringify(data)
    const formData = new FormData(this.formTarget)
    fetch(url, {
      method: "PATCH",
      headers: { "Accept": "application/json" },
      body: formData
    }).then(response => response.text()).then(console.log(data)).catch (error => {
        console.log(error)
      })
  }

  onDrop(event) {
    const targetElement = event.target
    const props = JSON.parse(event.dataTransfer.getData("application/drag-key"))

    if (Object.values(props).includes(null)) {// dragging new student from list
      // console.log(event)
      const duplicateCell = this.filter.call(this.cells, function(cell) {
        return cell.getAttribute('data-student') === props.student_id })[0]
      if (duplicateCell) { // check if student already exists in cell when being dropped from list
        duplicateCell.innerText = ''
        duplicateCell.style.backgroundColor = 'lightgray'
        duplicateCell.setAttribute('data-row', '')
        duplicateCell.setAttribute('data-col', '')
        duplicateCell.setAttribute('data-student', '')
      }
      // when dragged from list, hide student in list
      const selectedStudent = this.filter.call(this.studentListTarget.children, function(student) {
        return student.getAttribute('data-student') === props.student_id })[0]
      selectedStudent.classList.add('d-none')

      // add student info, etc to cell
      targetElement.innerText = props.name
      targetElement.style.backgroundColor = props.color
      targetElement.setAttribute('data-row', targetElement.parentElement.rowIndex)
      targetElement.setAttribute('data-col', targetElement.cellIndex)
      targetElement.setAttribute('data-student', props.student_id)
      event.preventDefault()
    } else { // Moving seats on the chart
      // if origin is cell and placement is cell
      const sourceElement = this.filter.call(this.cells, function(cell) {
        return cell.cellIndex === props.col && cell.parentElement.rowIndex === props.row
      })[0]
      if (sourceElement) {
        this.swap(sourceElement, targetElement)
        event.preventDefault()
      } else {
        sourceElement.innerText = ''
        sourceElement.style.backgroundColor = 'lightgray'
        sourceElement.setAttribute('data-row', '')
        sourceElement.setAttribute('data-col', '')
        sourceElement.setAttribute('data-student', '')
        selectedStudent.classList.remove('d-none')
      }
    }

    this.save({
      students: this.getPositions()
    })
  }

  onDragEnd(event) {
    // this.element.classList.remove('dragging')

  }
}
