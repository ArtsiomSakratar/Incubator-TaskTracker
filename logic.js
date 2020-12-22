/* CLASSES */

class Task {
  constructor(data) {
    this.title = data.title;
    this.text = data.text;
    this.priority = data.priority;
  }
}

/* MAIN */

let addTaskForm = document.querySelector("#addTaskForm");

addTaskForm.onsubmit = function () {
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

  let task = new Task({
    title,
    text,
    priority,
  });

  addTask(task);
};

for (let i = 0; i < localStorage.length; i++) {
  printTask(i);
}

/* FUNCTIONS */

function addTask(task) {
  let key = localStorage.length;
  task = JSON.stringify(task);

  localStorage.setItem(key, task);
}

function printTask(key) {
  taskData = JSON.parse(localStorage.getItem(key));

  let toDoList = document.querySelector("#currentTasks");

  let task = document.createElement("li");
  task.classList.add("list-group-item", "d-flex", "w-100", "mb-2");

  let content = document.createElement("div");
  content.classList.add("w-100", "mr-2");
  content.innerHTML = `<div class="d-flex w-100 justify-content-between">
                  <!-- Название задачи -->
                  <h5 class="mb-1">${taskData.title}</h5>
                  <!-- Приоритет и дата -->
                  <div>
                    <small class="mr-2">${taskData.priority}</small>
                    <small>11:00 01.01.2000</small>
                  </div>
                </div>
                <!-- Текст задачи -->
                <p class="mb-1 w-100">
                  ${taskData.text}
                </p>`;
  task.append(content);

  let button = document.createElement("div");
  button.classList.add("dropdown", "m-2", "dropleft");
  button.innerHTML = `
                <button
                  class="btn btn-secondary h-100"
                  type="button"
                  id="dropdownMenuItem1"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fas fa-ellipsis-v"></i>
                </button>
                
                <div
                  class="dropdown-menu p-2 flex-column"
                  aria-labelledby="dropdownMenuItem1"
                >
                  <button type="button" class="btn btn-success w-100">
                    Complete
                  </button>
                  <button type="button" class="btn btn-info w-100 my-2">
                    Edit
                  </button>
                  <button type="button" class="btn btn-danger w-100">
                    Delete
                  </button>
                </div>`;
  task.append(button);

  toDoList.append(task);
}