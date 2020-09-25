
var tasks = [];
var taskIdCounter = 0;
//create a new task item
var formEl = document.querySelector("#task-form");
//console.log(buttonEl);
//El suffix identifies this as a DOM element
//style the new task item
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");

var taskFormHandler = function (event) {
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    //var isEdit = formEl.hasAttribute("data-task-id");
    //console.log(isEdit);
    // package up data as an object
    //var taskDataObj = {name: taskNameInput,type: taskTypeInput};
    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;

    var isEdit = formEl.hasAttribute("data-task-id");
    //formEl.reset();
    // send it as an argument to createTaskEl
    // createTaskEl(taskDataObj);
    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        //document.querySelector("#save-task").textContent = "Add Task";
        completeEditTask(taskNameInput, taskTypeInput);
    }
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };
        createTaskEl(taskDataObj);
    }

};

var createTaskEl = function (taskDataObj) {
    //console.log(taskDataObj);
    //console.log(taskDataObj.status);
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    //add draggable
    listItemEl.setAttribute("draggable", "true");
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);
    //we're using taskIdCounter as the argument now to create buttons that correspond to the current task ID. Because createTaskActions() returns a DOM element, we can store that element in a variable (taskActionsEl). 
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    switch (taskDataObj.status) {
        case "to do":
            taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 0;
            tasksToDoEl.append(listItemEl);
            break;
        case "in progress":
            taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 1;
            tasksInProgressEl.append(listItemEl);
            break;
        case "completed":
            taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 2;
            tasksCompletedEl.append(listItemEl);
            break;
        default:
            console.log("Something went wrong!");
    }
    // tasksToDoEl.appendChild(listItemEl);
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);
    //localStorage.setItem("tasks", tasks);
    // increase task counter for next unique id
    saveTasks(;)
    taskIdCounter++;

};

var createTaskActions = function (taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);
    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);
    /* Note that textContent, className, and setAttribute() are properties and methods of the <button> elements. The appendChild() method will then add this <button> to the <div>. */
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);
    //array declaration
    var statusChoices = ["To Do", "In Progress", "Completed"];
    //for loop
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }
    return actionContainerEl;
};

var completeEditTask = function (taskName, taskType, taskId) {
    //console.log(taskName, taskType, taskId);
    //replace with:
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;
    // loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    }
    alert("Task Updated!");
    saveTasks();
    formEl.removeAttribute("data-task-id");
    formEl.querySelector("#save-task").textContent = "Add Task";
};


var taskButtonHandler = function (event) {
    // get target element from event
    var targetEl = event.target;
    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        console.log("edit", targetEl);
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
        console.log("delete", targetEl);
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var taskStatusChangeHandler = function (event) {
    console.log(event.target.value);
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");
    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();
    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
    // update task's in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
    //console.log(tasks);
    //localStorage.setItem("tasks", tasks);
    saveTasks();
};

var editTask = function (taskId) {
    console.log(taskId);
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);
    //update so the user knows the form is in edit mode
    //document.querySelector("#save-task").textContent = "Save Task";
    //document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    formEl.setAttribute("data-task-id", taskId);
    formEl.querySelector("#save-task").textContent = "Save Task";
};

var deleteTask = function (taskId) {
    console.log(taskId);
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
    // create new array to hold updated list of tasks
    var updatedTaskArr = [];
    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }
    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
    saveTasks();
    alert("Task deleted!");
    //localStorage.setItem("tasks", tasks);
};

var dropTaskHandler = function (event) {
    event.preventDefault();
    var id = event.dataTransfer.getData("text/plain");
    //console.log("Drop Event Target:", event.target, event.dataTransfer, id);
    var draggableElement = document.querySelector("[data-task-id='" + id + "']");
    //console.log(draggableElement);
    //console.dir(draggableElement);
    var dropZoneEl = event.target.closest(".task-list");
    dropZoneEl.removeAttribute("style");
    //console.log(statusType);
    //console.dir(dropZoneEl);
    // set status of task based on dropZone id
    var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    var statusType = dropZoneEl.id;
    //console.dir(statusSelectEl);
    //console.log(statusSelectEl);
    switch (statusType) {
        case "tasks-to-do":
            statusSelectEl.selectedIndex = 0;
            break;
        case "tasks-in-progress":
            statusSelectEl.selectedIndex = 1;
            break;
        case "tasks-completed":
            statusSelectEl.selectedIndex = 2;
            break;
        default:
            console.log("Something went wrong!");
    }

    // loop through tasks array to find and update the updated task's status
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(id)) {
            tasks[i].status = statusSelectEl.value.toLowerCase();
        }
    }
    //console.log(tasks);
    // localStorage.setItem("tasks", tasks);
    saveTasks();
    dropZone.removeAttribute("style");
    dropZoneEl.appendChild(draggableElement);

};

var dropZoneDragHandler = function (event) {
    //var id = event.dataTransfer.getData("text/plain");
    // console.log("Drop Event Target:", event.target, event.dataTransfer, id);
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
        event.preventDefault();
        //console.dir(taskListEl);
        taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
    }
};
var dragTaskHandler = function (event) {
    if (event.target.matches("li.task-item")) {
        var taskId = event.target.getAttribute("data-task-id");
        // console.log("Task ID:", taskId);
        //console.log("event", event);
        event.dataTransfer.setData("text/plain", taskId);
        // var getId = event.dataTransfer.getData("text/plain");
        //console.log("getId:", getId, typeof getId);
    }
};
var dragLeaveHandler = function (event) {
    //console.dir(event.target);
    var taskListEl = event.target.closest(".task-list");

    if (taskListEl) {
        event.target.closest(".task-list").removeAttribute("style");
    }
};
var saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("tasks saved");
};

var loadTasks = function () {
    var savedTasks = localStorage.getItem("tasks");

    if (!savedTasks) {
        return false;
    }

    savedTasks = JSON.parse(savedTasks);
    // loop through savedTasks array
    for (var i = 0; i < savedTasks.length; i++) {
        // pass each task object into the `createTaskEl()` function
        createTaskEl(savedTasks[i]);
    }
};

//add new task
formEl.addEventListener("submit", taskFormHandler);
//edit and delete 
pageContentEl.addEventListener("click", taskButtonHandler);
//status change
pageContentEl.addEventListener("change", taskStatusChangeHandler);
//dragging
pageContentEl.addEventListener("dragstart", dragTaskHandler);
pageContentEl.addEventListener("dragover", dropZoneDragHandler);
pageContentEl.addEventListener("dragleave", dragLeaveHandler);
pageContentEl.addEventListener("drop", dropTaskHandler);