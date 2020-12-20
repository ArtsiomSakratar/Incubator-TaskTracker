let addTask = document.querySelector('form');

let title;
let text;
let priority;

addTask.onsubmit = function () {
    title = document.querySelector('#inputTitle').value;
    text = document.querySelector('#inputText').value;
    
    console.log('hi');
};

console.log(title);
console.log(text);