class classroomEditor {
  constructor(viewport, classroom) {
    this.viewport = viewport;
    this.canvas = viewport.canvas;
    this.classroom = classroom;

    this.ctx = this.canvas.getContext("2d");

    // set variables as null initial and reassign later
    this.selected = null;
    this.touched = null;
    this.dragging = false;

    // add event listeners for touchObject function
    this.#addEventListeners();
  }

  #addEventListeners() {
    // must bind the classroomEditor as "this" otherwise it will assume "this" is the canvas
    this.canvas.addEventListener("touchstart", this.#handleTouchStart.bind(this));
    this.canvas.addEventListener("touchmove", this.#handleTouchMove.bind(this));
    // prevent menu from popping up
    this.canvas.addEventListener("contextmenu", (evt) => evt.preventDefault());
    this.canvas.addEventListener("touchend", () => this.dragging = false);
    }

  #handleTouchStart(evt) {
    // prioritize deselecting a desk over deleting one
    // if (this.selected) {
    //   this.selected = null;
    // } else if (this.touched) {
    //   this.#removeDesk(this.touched);
    // }

    // if touchObject is near an existing desk, select that desk
    if (this.touched) {
      this.#select(this.touched)
      this.selected = this.touched;
      this.dragging = true;
      return;
    }
    // add desk where touchObject initiated
    this.classroom.addDesk(this.touchObject);
    // add segment -------- needed?
    this.#select(this.touchObject);
    this.touched = this.touchObject;
  }

  #handleTouchMove(evt) {
    // get touchObject location
    // this.touchObject = new Desk(evt.offsetX, evt.offsetY);
    // get touchObject location from the viewport
    this.touchObject = this.viewport.getTouchObject(evt, true);
    // check to see if the current touchObject desk is near an existing desk (threshold of 10)
    this.touched = getNearestDesk(this.touchObject, this.classroom.desks, 10 * this.viewport.zoom);
    if (this.dragging == true) {
      this.selected.x = this.touchObject.x;
      this.selected.y = this.touchObject.y;
    }
  }

  #select(desk) {
    this.selected = desk;
  }

  // prevents desk from still being visible when touched after being deleted
  #removeDesk(desk) {
    this.classroom.removeDesk(desk);
    this.touched = null;
    if (this.selected == desk) {
      this.selected = null;
    }
  }

  dispose() {
    this.classroom.dispose();
    this.selected = null;
    this.touched = null;
  }

  display() {
    this.classroom.draw(this.ctx);
    // triggers fill to appear on desks being touched over
    if (this.touched) {
      this.touched.draw(this.ctx, { fill: true });
    }
  }
}
