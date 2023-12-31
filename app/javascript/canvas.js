var canvas = document.querySelector("canvas");
// get browser's width and height and set canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// c or ctx in canvas refers to "context"
// gets us access to all functions, etc
var ctx = canvas.getContext("2d");
ctx.scale(0.5, 0.5)


var max_seats = 25;
var columns = 3;
var rows = 5;
var working_width = window.innerWidth / (columns * 2 + 1);
var working_height = window.innerHeight / (rows * 2 + 1);
var x_coor = working_width;
var y_coor = working_height;

function generateDesks() {
  if (rows < columns) {
    console.log("condition 1")
    for (var c = 0; c < columns; c++) {
      generateRow(rows, x_coor, y_coor);
      y_coor += working_height * 2;
    }
  } else {
    console.log("condition 2")
    for (var r = 0; r < rows; r++) {
      generateColumn(columns, x_coor, y_coor);
      x_coor += working_width * 2;
    }
  }
}

function generateRow(rows, x_coor, y_coor) {
  for (var r = 0; r < rows; r++) {
    console.log("generating row");
    ctx.fillStyle = "black";
    ctx.fillRect(x_coor, y_coor, working_width, working_height);
    x_coor += working_width * 2;
  }
}

function generateColumn(columns, x_coor, y_coor) {
  for (var c = 0; c < columns; c++) {
    console.log("generating column");
    ctx.fillStyle = "black";
    ctx.fillRect(x_coor, y_coor, working_width, working_height);
    console.log(x_coor)
    y_coor += working_height * 2;
  }
}

generateDesks();
