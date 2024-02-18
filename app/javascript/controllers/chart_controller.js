import { Controller } from "@hotwired/stimulus"


export default class extends Controller {

  static targets = ["form"]
  static values = { "students": String }

  connect() {
    // console.log(this.formTarget.querySelector('#arrangement_s_class_id').value)
    // const urlArray = this.formTarget.action.split('?')
    // const post = `${urlArray[0]}`

    this.cells = this.element.querySelectorAll('td')

    if (this.formTarget.getAttribute('data-new') === true) {
      fetch(this.formTarget.action, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-type": "application/json" },
        body: JSON.stringify({s_class_id: this.formTarget.querySelector('#arrangement_s_class_id').value})
      }).then(response => response.json())
        .then(jsonResponse => {
          console.log(jsonResponse);
        }).catch (error => {
          console.log(error)
        })
    } else {
      const students_array = JSON.parse(this.studentsValue).students
      console.log(students_array)
      students_array.forEach((student) => {
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
    // this.element.classList.add('dragging')
    // console.log(event.target);

    let hash

    if (event.target.classList.contains("s-class-cards")) {
      hash = {row: null, col: null, color: event.target.style.backgroundColor, name: event.target.innerText}
    } else {
      hash = {row: event.target.parentElement.rowIndex, col: event.target.cellIndex}
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
      console.log(seat)
      if (seat.getAttribute('student_id') !== "") {
        seatsArray.push({
          student_id: seat.getAttribute('data-student'),
          row: this.getPosition(seat)[0],
          col: this.getPosition(seat)[1],
          name: seat.innerText,
          gender: this.getGender(seat)
        })
      }
    })
    console.log(seatsArray)
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

  // ADD STUDENT ID TO ARGUMENTS
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
    const arrangement = JSON.parse(this.formTarget.getAttribute('data-arrangement'))
    const url = `${this.formTarget.action}`
    console.log(url)
    this.formTarget.querySelector('#arrangement_json_file').value = JSON.stringify(data)
    const formData = new FormData(this.formTarget)
    fetch(url, {
      method: "PATCH",
      headers: { "Accept": "application/json" },
      body: formData
    }).then(response => response.json())
      .then(jsonResponse => {
        console.log(jsonResponse);
      }).catch (error => {
        console.log(error)
      })
      // arrangement: { json_file: JSON.stringify(data) }
  }

  onDrop(event) {
    const targetElement = event.target
    const props = JSON.parse(event.dataTransfer.getData("application/drag-key"))

    if (Object.values(props).includes(null)) {
      targetElement.innerText = props.name
      targetElement.style.backgroundColor = props.color
      event.preventDefault()
    } else {
      const cells = this.element.querySelectorAll("td")
      const filter = Array.prototype.filter
      const sourceElement = filter.call(cells, function(cell) {
        return cell.cellIndex === props.col && cell.parentElement.rowIndex === props.row
      })[0]

      this.swap(sourceElement, targetElement)
      event.preventDefault()
    }

    this.save({
      students: [
        this.getPositions()
      ]
    })
  }

  onDragEnd(event) {
    // this.element.classList.remove('dragging')

  }
}
