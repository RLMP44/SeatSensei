import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    console.log("hello from classroom controller")
  }
}

class Classroom {
  constructor(desks = []) {
    this.desks = desks;
  }

  // adds desks to the canvas when button is pushed
  addDesk(desk) {
    this.desks.push(desk);
  }

  // checks to see if a desk already exists so we don't have 2 in the same spot
  // will return something (true) or nothing (false)
  containsDesk(desk) {
    return this.desks.find((d) => d.equals(desk));
  }

  equals(desk) {
    return this.x == desk.x && this.y == desk.y;
  }

  // add a new desk only if it doesn't already exist
  tryAddDesk(desk) {
    if (!this.containsDesk(desk)) {
      this.addDesk(desk);
      return true;
    }
    return false;
  }

  // clear the canvas
  dispose() {
    this.desks.length = 0;
  }

  // draw all desks in classroom
  draw(ctx) {
    for (const desk of this.desks) {
      desk.draw(ctx);
    }
  }
}

export { Classroom };
