import TaskTracker from "./TaskTracker.js";
import Task from "./Task.js";

let taskTracker = new TaskTracker(localStorage.getItem("tasks"));
taskTracker.printTasks();
// localStorage.clear();

let altSortButton = document.querySelector("#altSort");
altSortButton.onclick = function () {
  taskTracker.sortTasks('alt');
};

let sortButton = document.querySelector("#sort");
sortButton.onclick = function () {
  taskTracker.sortTasks();
};

let completeTaskButtons = document.querySelectorAll(".btn-success");
for (const completeButton of completeTaskButtons) {
  completeButton.onclick = function () {
    let id = completeButton.parentElement.getAttribute("aria-labelledby");
    taskTracker.completeTask(id);
  };
}

let key;
let editTaskButtons = document.querySelectorAll(".btn-info");
for (const editButton of editTaskButtons) {
  editButton.onclick = function () {
    let id = editButton.parentElement.getAttribute("aria-labelledby");
    key = taskTracker.prepareForTaskEdit(id);
  };
}

let deleteTaskButtons = document.querySelectorAll(".btn-danger");
for (const deleteButton of deleteTaskButtons) {
  deleteButton.onclick = function () {
    let id = deleteButton.parentElement.getAttribute("aria-labelledby");
    taskTracker.deleteTask(id);
  };
}

let addTaskForm = document.querySelector("#addTaskForm");
addTaskForm.onsubmit = function () {
  let addMode = document.querySelector("#exampleModalLabel").innerHTML;
  taskTracker.saveTask(addMode, key);
};

document.querySelector("#addTaskButton").onclick = function () {
  taskTracker.clearForm();
}
