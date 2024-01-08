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

// // get "context" for access to all functions
// var ctx = canvas.getContext("2d");
// ctx.transform(.5, 0, 0, .5, 0, 0);
// // const { width, height } = canvas.getBoundingClientRect();

// function resizeCanvas(canvas){
//   var con = document.getElementById("classrooms-container"),
//       canvas = document.getElementById("canvas"),
//       aspect = canvas.height/canvas.width,
//       width = con.offsetWidth,
//       height = con.offsetHeight;

//   canvas.width = width;
//   canvas.height = Math.round(width * aspect);
// }

// window.onresize = resizeCanvas;
// window.onload = resizeCanvas;

// function generateDesks(canvas) {
//   var max_seats = 25;
//   var columns = 3;
//   var rows = 5;
//   var working_width = canvas.width / (columns * 2 + 1);
//   var working_height = canvas.height / (rows * 2 + 1);
//   var x_coor = working_width;
//   var y_coor = working_height;

//   for (var r = 0; r < rows; r++) {
//     generateColumn(columns, x_coor, y_coor, working_width, working_height);
//     x_coor += working_width * 2;
//   }
// }


// function generateColumn(columns, x_coor, y_coor, working_width, working_height) {
//   for (var c = 0; c < columns; c++) {
//     console.log("generating column");
//     ctx.fillStyle = "black";
//     new Desk(x_coor, y_coor, working_width, working_height);
//     y_coor += working_height * 2;
//   }
// }

// generateDesks(canvas);
