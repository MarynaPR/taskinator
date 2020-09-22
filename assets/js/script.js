
//create a new task item
var formEl = document.querySelector("#task-form");
//console.log(buttonEl);
//El suffix identifies this as a DOM element
//style the new task item
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function (event) {

    //instructing the browzser to not carry its default behavior
    event.preventDefault();


    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
};
formEl.addEventListener("submit", createTaskHandler); {
    var listItemEl = document.createElement("li");
    //add the text
    listItemEl.className = "task-item";
    //append this element to the task list
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
};
