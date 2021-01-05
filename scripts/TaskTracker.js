import Task from "./Task.js";

export default class TaskTracker {
  tasks = [];

  constructor(tasksData) {
    if (tasksData) this.tasks = JSON.parse(tasksData);
  }

  getUserInput() {
    let title = document.querySelector("#inputTitle").value;
    let text = document.querySelector("#inputText").value;
    let radios = document.querySelectorAll(".form-check-input");

    let priority;
    for (const radio of radios) {
      if (radio.checked) {
        priority = radio.value;
        break;
      }
    }

    return { title, text, priority };
  }

  saveTask(addMode, key) {
    let taskFormData = this.getUserInput();
    let task = new Task(taskFormData);
    
    if (addMode == "Edit task") {
      this.tasks[key] = task;
    } else {
      this.tasks.push(task);
    }

    let tasksData = JSON.stringify(this.tasks);
    localStorage.setItem("tasks", tasksData);
  }

  printTasks() {
    for (const task of this.tasks) {
      this.printTask(task);
    }
  }

  printTask(task) {
    let currentTasks = document.querySelector("#currentTasks");
    let completedTasks = document.querySelector("#completedTasks");

    let createdTask = this.createTask(task);

    if (task.status) {
      completedTasks.append(createdTask);
    } else {
      currentTasks.append(createdTask);
    }
    
  }

  createTask(task) {
    let newTask = document.createElement("li");
    newTask.classList.add("list-group-item", "d-flex", "w-100", "mb-2");

    let createdTaskContent = this.creatTaskContent(task);
    newTask.append(createdTaskContent);

    let createdTaskMenuButton = this.createTaskMenuButton(task);
    newTask.append(createdTaskMenuButton);

    return newTask;
  }

  creatTaskContent(task) {
    let taskContent = document.createElement("div");
    taskContent.classList.add("w-100", "mr-2");

    taskContent.innerHTML = `<div class="d-flex w-100 justify-content-between">
                  <!-- Название задачи -->
                  <h5 class="mb-1">${task.title}</h5>
                  <!-- Приоритет и дата -->
                  <div>
                    <small class="mr-2">${task.priority}</small>
                    <small>${task.time} ${task.date}</small>
                  </div>
                </div>
                <!-- Текст задачи -->
                <p class="mb-1 w-100">
                  ${task.text}
                </p>`;

    return taskContent;
  }

  createTaskMenuButton(task) {
    let taskMenuButton = document.createElement("div");
    taskMenuButton.classList.add("dropdown", "m-2", "dropleft");

    let display = task.status ? `style="display: none;"` : ``;

    taskMenuButton.innerHTML = `
                <button
                  class="btn btn-secondary h-100"
                  type="button"
                  id="${task.id}"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fas fa-ellipsis-v"></i>
                </button>
                
                <div
                  class="dropdown-menu p-2 flex-column"
                  aria-labelledby="${task.id}"
                >
                  <button type="button" class="btn btn-success w-100" ${display}>
                    Complete
                  </button>
                  <button type="button" class="btn btn-info w-100 my-2" ${display}>
                    Edit
                  </button>
                  <button type="button" class="btn btn-danger w-100">
                    Delete
                  </button>
                </div>`;

    
    
    return taskMenuButton;
  }

  completeTask(id) {
    for (const key in this.tasks) {
      if (this.tasks[key].id == id) {
        this.tasks[key].status = true;
        break;
      }
    }
    let tasksData = JSON.stringify(this.tasks);
    localStorage.setItem("tasks", tasksData);
    document.location.reload();
  }

  prepareForTaskEdit(id) {
    let title = document.querySelector("#inputTitle");
    let text = document.querySelector("#inputText");
    let radios = document.querySelectorAll(".form-check-input");

    let addTaskButton = document.querySelector("#addTaskButton");
    addTaskButton.click();

    let key;
    for (key in this.tasks) {
      if (this.tasks[key].id == id) {
        break;
      }
    }

    document.querySelector("#exampleModalLabel").innerHTML = "Edit task";

    title.value = this.tasks[key].title;
    text.value = this.tasks[key].text;

    for (const radio of radios) {
      if (radio.value == this.tasks[key].priority) {
        radio.checked = true;
        break;
      }
    }

    let closeTaskButton = document.querySelector("#closeTaskButton");
    let saveTaskButton = document.querySelector("#saveTaskButton");
    saveTaskButton.innerHTML = "OK";

    return key;
  }

  deleteTask(id) {
    for (const key in this.tasks) {
      if (this.tasks[key].id == id) {
        this.tasks.splice(key, 1);
        break;
      }
    }
    let tasksData = JSON.stringify(this.tasks);
    localStorage.setItem("tasks", tasksData);
    document.location.reload();
  }
}
