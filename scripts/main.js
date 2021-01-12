import TaskTracker from "./TaskTracker.js";
import Task from "./Task.js";

let taskTracker = new TaskTracker(localStorage.getItem("tasks"));
taskTracker.printTasks();
taskTracker.loadTheme();
taskTracker.loadLang();
// localStorage.clear();

let altSortButton = document.querySelector("#altSort");
altSortButton.onclick = function () {
  taskTracker.sortTasks('alt');
};

let sortButton = document.querySelector("#sort");
sortButton.onclick = function () {
  taskTracker.sortTasks();
};

let themeButton = document.querySelector("#themeSwitch");
themeButton.onclick = function () {
  taskTracker.changeTheme();
};

let langButton = document.querySelector("#langSwitch");
langButton.onclick = function () {
  taskTracker.changeLang();
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

// Drag and Drop

const tasksListElement = document.querySelector(`#currentTasks`);
const completeListElement = document.querySelector(`#completedTasks`);
let taskElements = document.querySelectorAll(`.tasks__item`);

for (const task of taskElements) {
  task.draggable = true;
}


tasksListElement.addEventListener(`dragstart`, (evt) => {
  evt.target.classList.add(`selected`);
});
completeListElement.addEventListener(`dragstart`, (evt) => {
  evt.target.classList.add(`selected`);
});


tasksListElement.addEventListener(`dragend`, (evt) => {
  let activeElement = document.querySelector(`.selected`);
  let activeID = activeElement.querySelector(".id").id;

  evt.target.classList.remove(`selected`);

  activeElement.querySelector(".btn-success").style.display = "";
  activeElement.querySelector(".btn-info").style.display = "";

  taskTracker.changeStatus(activeID, false);
  taskTracker.changeData();
});

completeListElement.addEventListener(`dragend`, (evt) => {
  let activeElement = document.querySelector(`.selected`);
  let activeID = activeElement.querySelector(".id").id;

  evt.target.classList.remove(`selected`);

  activeElement.querySelector(".btn-success").style.display = "none";
  activeElement.querySelector(".btn-info").style.display = "none";

  taskTracker.changeStatus(activeID, true);
  taskTracker.changeData();
});


tasksListElement.addEventListener(`dragover`, (evt) => {
  evt.preventDefault();

  const activeElement = document.querySelector(`.selected`);
  const currentElement = evt.target;

  const isMoveable =
    activeElement !== currentElement &&
    currentElement.classList.contains(`tasks__item`);

  if (!isMoveable) {
    return;
  }

  const nextElement =
    currentElement === activeElement.nextElementSibling
      ? currentElement.nextElementSibling
      : currentElement;

  tasksListElement.insertBefore(activeElement, nextElement);
});

completeListElement.addEventListener(`dragover`, (evt) => {
  evt.preventDefault();

  const activeElement = document.querySelector(`.selected`);
  const currentElement = evt.target;

  const isMoveable =
    activeElement !== currentElement &&
    currentElement.classList.contains(`tasks__item`);

  if (!isMoveable) {
    return;
  }

  const nextElement =
    currentElement === activeElement.nextElementSibling
      ? currentElement.nextElementSibling
      : currentElement;

  completeListElement.insertBefore(activeElement, nextElement);
});

document.querySelector("#todo").addEventListener('dragover', (evt) => {
  tasksListElement.append(document.querySelector(`.selected`));
});

document.querySelector("#completed").addEventListener("dragover", (evt) => {
  completeListElement.append(document.querySelector(`.selected`));
});