import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    console.log("hello from desk controller")
  }

  constructor(x, y, width, height) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  // create desk
  // pass in multiple params or allow them to be blank
  draw(ctx, { size = 18, color = "black", outline = false, fill = false } = {} ) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
    if (outline) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";
      // to show element to be selected
      ctx.arc(this.x, this.y, this.width * 0.6, this.height * 0.6);
      ctx.stroke();
    }
    if (fill) {
      ctx.beginPath();
      // to show selected element
      ctx.arc(this.x, this.y, this.width * 0.4, this.height * 0.4);
      ctx.fillStyle = "yellow";
      ctx.fill();
    }
  }
}
