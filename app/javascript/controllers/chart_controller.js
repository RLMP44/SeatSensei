import { Controller } from "@hotwired/stimulus"


export default class extends Controller {

  static targets = ["form"]

  connect() {
    console.log("hello from chart!")
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
    const students = [...this.element.querySelectorAll('seat')]

    return students.map(student => ({
      student_id: student.getAttribute('data-student'),
      row: this.getPosition(student)[0],
      col: this.getPosition(student)[1],
    }))
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

    seat.innerText = oldText
    seat.style.backgroundColor = oldColor

    // seat.setAttribute('data-row', row)
    // seat.setAttribute('data-col', col)
  }

  swap(seat1, seat2) {
    const seat2Pos = this.getPosition(seat2)
    this.setPosition(seat1, seat2Pos)
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
  }

  save(data) {
    fetch(this.formTarget.action, {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: new FormData(this.formTarget)
    }).then(response => response.json()) //change this later
  }

  onDragEnd(event) {
    // this.element.classList.remove('dragging')
    this.save({
      s_class: {
        students: this.getPositions()
      }
    })
  }
}
