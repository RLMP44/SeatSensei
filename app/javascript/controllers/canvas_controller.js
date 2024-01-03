import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
}

import classroomController from "./controllers/classroom_controller"
application.register("classroom", classroomController)
import classroomEditorController from "./controllers/classroom_editor_controller"
application.register("classroomEditor", classroomEditorController)
import deskController from "./controllers/desk_controller"
application.register("desk", deskController)
import viewportController from "./controllers/viewport_controller"
application.register("viewport", viewportController)

var canvas = document.querySelector("canvas");
var container = document.querySelector("classrooms-container");

// start JavaScript canvas here
canvas.width = 600;
canvas.height = 600;

const ctx = canvas.getContext("2d");

const classroomString = localStorage.getItem("classroom");
// check if a classroom file already exists, if so parse
const classroomInfo = classroomString ? JSON.parse(classroomString) : null;
// make classroom with existing info if exists, or an empty classroom if not
const classroom = classroomInfo
  ? classroom.load(classroomInfo)
  : new classroom();
const viewport = new Viewport(canvas);
// initialize with the viewport so it knows level of zoom
const classroomEditor = new classroomEditor(viewport, classroom);

animate();

function animate() {
  viewport.reset();
  classroomEditor.display();
  requestAnimationFrame(animate);
}

function dispose() {
  classroomEditor.dispose();
}

function save() {
  // save to local storage, but must be JSON file
  // local storage only works with strings
  localStorage.setItem("classroom", JSON.stringify(classroom));
  // can check to see if it's been saved by going to the console
  // and typing in "localStorage.getItem('classroom')"
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
