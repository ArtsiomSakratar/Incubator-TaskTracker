let addForm = document.querySelector('#addTaskForm');
let addTaskButton = document.querySelector("#addTaskForm");

let title;
let text;
let priority;

addForm.onsubmit = function () {
  title = document.querySelector("#inputTitle").value;
  text = document.querySelector("#inputText").value;

  console.log("hi");
};

addTaskButton.onclick = function () {
    title = document.querySelector("#inputTitle").value;
    text = document.querySelector("#inputText").value;

    console.log("hi");
}

console.log(title);
console.log(text);