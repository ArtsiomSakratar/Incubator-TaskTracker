import Task from "./Task.js";

export default class TaskTracker {
  tasks = [];

  currentCount = 0;
  completedCount = 0;

  constructor(tasksData) {
    if (tasksData) this.tasks = JSON.parse(tasksData);
  }

  changeTheme() {
    let theme = localStorage.getItem("theme");

    if (theme == "dark") {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }

    document.location.reload();
  }

  changeLang() {
    let lang = localStorage.getItem("lang");

    if (lang == "ru") {
      localStorage.setItem("lang", "eng");
    } else {
      localStorage.setItem("lang", "ru");
    }

    document.location.reload();
  }

  loadTheme() {
    let theme = localStorage.getItem('theme');
    if (theme == "dark") {
      let head = document.querySelector("head");
      let darkLink = document.createElement("link");

      darkLink.rel = "stylesheet";
      darkLink.href = "styles/dark.css";

      head.append(darkLink);
      document.querySelector("#themeSwitch").checked = true;
    } 
    
  }

  loadLang() {
    let lang = localStorage.getItem("lang");

    if (lang == "ru") {
      document.querySelector("h1").innerHTML = "Мой список задач";
      document.querySelector("#addTaskButton").innerHTML = `<i class="fas fa-plus"></i>
            Новая Задача`;
      document.querySelector("#todo").innerHTML = `Текущие (${this.currentCount})`;
      document.querySelector("#completed").innerHTML = `Выполненные (${this.completedCount})`;

      let tasksPriority = document.querySelectorAll("#tasksPriority");
      for (const priority of tasksPriority) {
        if (priority.innerHTML == "Low") priority.innerHTML = "Низкий";
        else if (priority.innerHTML == "Medium") priority.innerHTML = "Средний";
        else priority.innerHTML = "Высокий";
      }
      
      let menuButtons = document.querySelectorAll("#menuButton");
      for (const button of menuButtons) {
        if (button.innerHTML.includes("Complete")) button.innerHTML = "Завершить";
        else if (button.innerHTML.includes("Edit")) button.innerHTML = "Редактировать";
        else button.innerHTML = "Удалить";
      }
      
      document.querySelector("#formTitle").innerHTML = "Название";
      document.querySelector("#inputTitle").placeholder = "Название";
      document.querySelector("#formText").innerHTML = "Текст";
      document.querySelector("#inputText").placeholder = "Текст";
      document.querySelector("#formPriority").innerHTML = "Приорити";
      document.querySelector("#formLow").innerHTML = "Низкий";
      document.querySelector("#formMedium").innerHTML = "Средний";
      document.querySelector("#formHigh").innerHTML = "Высокий";
      document.querySelector("#closeTaskButton").innerHTML = "Закрыть";

      document.querySelector("#langSwitch").checked = true;
    }
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

    document.querySelector("#todo").innerHTML = `ToDo (${this.currentCount})`;
    document.querySelector("#completed").innerHTML = `Completed (${this.completedCount})`;
  }

  printTask(task) {
    let currentTasks = document.querySelector("#currentTasks");
    let completedTasks = document.querySelector("#completedTasks");

    let createdTask = this.createTask(task);

    if (task.status) {
      completedTasks.append(createdTask);
      this.completedCount++;
    } else {
      currentTasks.append(createdTask);
      this.currentCount++;
    }
  }

  createTask(task) {
    let newTask = document.createElement("li");
    newTask.classList.add(
      "list-group-item",
      "d-flex",
      "w-100",
      "mb-2",
      "tasks__item"
    );

    let color = "green";
    if (task.priority == "Medium") color = "#FFBC2D";
    else if (task.priority == "High") color = "#FF0000";

    newTask.style.backgroundColor = color;

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
                    <small class="mr-2" id="tasksPriority">${task.priority}</small>
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
                  class="btn btn-secondary h-100 id"
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
                  <button type="button" id="menuButton" class="btn btn-success w-100" ${display}>
                    Complete
                  </button>
                  <button type="button" id="menuButton" class="btn btn-info w-100 my-2" ${display}>
                    Edit
                  </button>
                  <button type="button" id="menuButton" class="btn btn-danger w-100">
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

    if (localStorage.getItem("lang") == "ru")
      document.querySelector("#exampleModalLabel").innerHTML =
        "Редактирование задачи";
    else document.querySelector("#exampleModalLabel").innerHTML = "Edit task";

    title.value = this.tasks[key].title;
    text.value = this.tasks[key].text;

    for (const radio of radios) {
      if (radio.value == this.tasks[key].priority) {
        radio.checked = true;
        break;
      }
    }

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

  sortTasks(mode) {
    if (mode == "alt") {
      this.tasks.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
    } else {
      this.tasks.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
    }

    let tasksData = JSON.stringify(this.tasks);
    localStorage.setItem("tasks", tasksData);
    document.location.reload();
  }

  clearForm() {
    let title = document.querySelector("#inputTitle");
    let text = document.querySelector("#inputText");
    let radios = document.querySelectorAll(".form-check-input");
    let saveTaskButton = document.querySelector("#saveTaskButton");

    if (localStorage.getItem("lang") == "ru") {
      document.querySelector("#exampleModalLabel").innerHTML =
        "Добавление задачи";
      saveTaskButton.innerHTML = "Добавить";
    }
    else {
      document.querySelector("#exampleModalLabel").innerHTML = "Add task";
      saveTaskButton.innerHTML = "Add task";
    }

    title.value = "";
    text.value = "";

    for (const radio of radios) {
      radio.checked = false;
    }
  }

  changeStatus(id, complete) {
    for (const key in this.tasks) {
      if (this.tasks[key].id == id) {
        let status = this.tasks[key].status;

        if (complete == true && status == false) {
          this.tasks[key].status = true;
          this.currentCount--;
          this.completedCount++;
        } else if (complete == false && status == true) {
          this.tasks[key].status = false;
          this.currentCount++;
          this.completedCount--;
        }

        break;
      }
    }

    let lang = localStorage.getItem("lang");

    if (lang == "ru") {
      document.querySelector("#todo").innerHTML = `Текущие (${this.currentCount})`;
      document.querySelector("#completed").innerHTML = `Выполненные (${this.completedCount})`;
    } else {
      document.querySelector("#todo").innerHTML = `ToDo (${this.currentCount})`;
      document.querySelector("#completed").innerHTML = `Completed (${this.completedCount})`;
    }

    let tasksData = JSON.stringify(this.tasks);
    localStorage.setItem("tasks", tasksData);
  }

  changeData() {
    let elements = document.querySelectorAll(`.tasks__item`);
    let newTasks = [];

    for (const element of elements) {
      let id = element.querySelector(".id").id;

      for (const task of this.tasks) {
        if (task.id == id) newTasks.push(task);
      }
    }

    let tasksData = JSON.stringify(newTasks);
    localStorage.setItem("tasks", tasksData);
  }
}
