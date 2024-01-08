import { Controller } from "@hotwired/stimulus"
// import { Desk } from "./desk_controller.js"

export default class extends Controller {
  connect() {
    console.log("hello from viewport controller")
  }

  constructor(canvas) {
    super();
    this.canvas = canvas;
    // get context via the canvas once more
    this.ctx = canvas.getContext("2d");

    // set to default
    this.zoom = 1;
    this.center = new Desk(canvas.width / 2, canvas.height / 2, 150, 100);
    this.offset = scale(this.center, -1);

    this.drag = {
      // may have to change height and width to working-height and width here
      start: new Desk(0, 0, 150, 100),
      end: new Desk(0, 0, 150, 100),
      offset: new Desk(0, 0, 150, 100),
      active: false
    };

    // to change the zoom
    this.#addEventListeners();
  }

  scale(desk, scaler) {
    return new Desk(desk.x * scaler, desk.y * scaler);
  }

  reset() {
    this.ctx.restore();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    this.ctx.translate(this.center.x, this.center.y);
    this.ctx.scale(1 / this.zoom, 1 / this.zoom);
    // let viewport calculate offset and animate constantly to see results
    const offset = this.getOffset();
    this.ctx.translate(offset.x, offset.y);
  }

  // mouse needs context to know what level of zoom it is
  // so it can place desks accurately
  // called in the graphEditor
  getTouchObject(evt, subtractDragOffset = false) {
    const desk = new Desk(
      // subtract center from offset to ensure starting position is correct
      // subtract this.offset.y or x from zoom to ensure desks come in at correct spot
      (evt.offsetX - this.center.x) * this.zoom - this.offset.x,
      (evt.offsetY - this.center.y) * this.zoom - this.offset.y
    );
    // subtract drag offset to make sure segment attaches to mouse
    // during drag motions
    return subtractDragOffset ? subtract(desk, this.drag.offset) : desk;
  }

  getOffset () {
    return add(this.offset, this.drag.offset);
  }

  add(desk1, desk2) {
    return new Desk(desk1.x + desk2.x, desk1.y + desk2.y);
  }

  subtract(desk1, desk2) {
    return new Desk(desk1.x - desk2.x, desk1.y - desk2.y);
  }

  #addEventListeners() {
    this.canvas.addEventListener("touchstart", this.#handleTouchStart.bind(this));
    this.canvas.addEventListener("touchmove", this.#handleTouchMove.bind(this));
    this.canvas.addEventListener("touchend", this.#handleTouchEnd.bind(this));
  }

  #handleTouchEnd(evt) {
    if (this.drag.active) {
      this.offset = add(this.offset, this.drag.offset);
      // reset drag once it is finished
      this.drag = {
        start: new Desk(0, 0, 150, 100),
        end: new Desk(0, 0, 150, 100),
        offset: new Desk(0, 0, 150, 100),
        active: false
      };
    }
  }

  #handleTouchMove(evt) {
    // if being dragged, listen for end, get coordinates, and rewrite offset
    if (this.drag.active) {
      this.drag.end = this.getTouchObject(evt);
      this.drag.offset = subtract(this.drag.end, this.drag.start);
    }
  }

  #handleTouchStart(evt) {
    this.drag.start = this.getTouchObject(evt);
    this.drag.active = true;
  }
}
