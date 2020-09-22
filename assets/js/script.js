
//create a new task item
var buttonEl = document.querySelector("#save-task");
//console.log(buttonEl);
//El suffix identifies this as a DOM element
//style the new task item
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function () {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
}
buttonEl.addEventListener("click", createTaskHandler); {
    var listItemEl = document.createElement("li");
    //add the text
    listItemEl.className = "task-item";
    //append this element to the task list
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
};
