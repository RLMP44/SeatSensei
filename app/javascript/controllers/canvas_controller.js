import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
}

var canvas = document.querySelector("canvas");
var container = document.querySelector("classrooms-container");

// get "context" for access to all functions
var ctx = canvas.getContext("2d");
ctx.transform(.5, 0, 0, .5, 0, 0);
// const { width, height } = canvas.getBoundingClientRect();

function resizeCanvas(canvas){
  var con = document.getElementById("classrooms-container"),
      canvas = document.getElementById("canvas"),
      aspect = canvas.height/canvas.width,
      width = con.offsetWidth,
      height = con.offsetHeight;

  canvas.width = width;
  canvas.height = Math.round(width * aspect);
}

window.onresize = resizeCanvas;
window.onload = resizeCanvas;

function generateDesks(canvas) {
  var max_seats = 25;
  var columns = 3;
  var rows = 5;
  var working_width = canvas.width / (columns * 2 + 1);
  var working_height = canvas.height / (rows * 2 + 1);
  var x_coor = working_width;
  var y_coor = working_height;

  for (var r = 0; r < rows; r++) {
    generateColumn(columns, x_coor, y_coor, working_width, working_height);
    x_coor += working_width * 2;
  }
}


function generateColumn(columns, x_coor, y_coor, working_width, working_height) {
  for (var c = 0; c < columns; c++) {
    console.log("generating column");
    ctx.fillStyle = "black";
    ctx.fillRect(x_coor, y_coor, working_width, working_height);
    y_coor += working_height * 2;
  }
}

// generateDesks();
webkitRequestAnimationFrame(generateDesks);

// ----------------- old code ----------------------- //
// function generateDesks() {
//   if (rows < columns) {
//     for (var c = 0; c < columns; c++) {
//       generateRow(rows, x_coor, y_coor);
//       y_coor += working_height * 2;
//     }
//   } else {
//     for (var r = 0; r < rows; r++) {
//       generateColumn(columns, x_coor, y_coor);
//       x_coor += working_width * 2;
//     }
//   }
// }

// function generateRow(rows, x_coor, y_coor) {
//   for (var r = 0; r < rows; r++) {
//     console.log("generating row");
//     ctx.fillStyle = "black";
//     ctx.fillRect(x_coor, y_coor, working_width, working_height);
//     x_coor += working_width * 2;
//   }
// }

// function generateColumn(columns, x_coor, y_coor) {
//   for (var c = 0; c < columns; c++) {
//     console.log("generating column");
//     ctx.fillStyle = "black";
//     ctx.fillRect(x_coor, y_coor, working_width, working_height);
//     console.log(x_coor)
//     y_coor += working_height * 2;
//   }
// }

// generateDesks();
