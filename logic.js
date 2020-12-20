let addForm = document.querySelector('#addTaskForm');
let addTaskButton = document.querySelector("#addTaskButton");

let title;
let text;
let priority;

addForm.onsubmit = function () {
  title = document.querySelector("#inputTitle").value;
  text = document.querySelector("#inputText").value;

  console.log("test");
};

addTaskButton.onclick = function () {
    title = document.querySelector("#inputTitle").value;
    text = document.querySelector("#inputText").value;

    console.log("test");
}

console.log(title);
console.log(text);