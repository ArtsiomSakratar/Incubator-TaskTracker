import TaskTracker from "./TaskTracker.js";
import Task from "./Task.js";

let taskTracker = new TaskTracker(localStorage.getItem("tasks"));
// localStorage.clear();

let addTaskForm = document.querySelector("#addTaskForm");
addTaskForm.onsubmit = function (e) {
  // e.preventDefault();
  taskTracker.saveTask();
};

// console.log(localStorage.getItem("tasks"));
taskTracker.printTasks();

let completeTaskButtons = document.querySelectorAll(".btn-success");
for (const completeButton of completeTaskButtons) {
  completeButton.onclick = function () {
    
  };
}

let editTaskButtons = document.querySelectorAll(".btn-info");
for (const editButton of editTaskButtons) {
  editButton.onclick = function () {
    
  };
}

let deleteTaskButtons = document.querySelectorAll(".btn-danger");
for (const deleteButton of deleteTaskButtons) {
  deleteButton.onclick = function () {
    
  };
}