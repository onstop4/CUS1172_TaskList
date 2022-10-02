tasks = [];

function addTask(e) {
    e.preventDefault();

    const taskId = `task-${tasks.length + 1}`;
    tasks.push(taskId);

    let taskTitle = document.querySelector("#new-task-title").value;
    let taskPriority = document.querySelector("#new-task-priority").value;
    let taskDone = document.querySelector("#new-task-done").checked;

    let elementTitle = document.createElement("p");
    elementTitle.classList.add("task-title");
    elementTitle.innerText = taskTitle;

    let doneButton = document.createElement("button");
    doneButton.classList.add("btn", "task-done-button");
    modifyDoneStatus(doneButton, false);
    doneButton.addEventListener("click", () => { markTaskAsDone(taskId) });

    let removeButton = document.createElement("button");
    removeButton.classList.add("btn", "btn-danger");
    removeButton.innerText = "Remove"
    removeButton.addEventListener("click", () => { removeTask(taskId) });

    let buttonGroup = document.createElement("div");
    buttonGroup.classList.add("btn-group");
    buttonGroup.append(doneButton, removeButton);

    let element = document.createElement("li");
    element.id = taskId
    element.classList.add("task", `task-priority-${taskPriority}`, "my-3", "p-3", "rounded", "shadow-sm");
    if (taskDone) {
        element.classList.add("task-done");
    }
    element.append(elementTitle, buttonGroup);

    document.querySelector("#tasks").append(element);
}

function markTaskAsDone(taskId) {
    let element = document.querySelector(`#${taskId}`);
    let doneButton = element.querySelector(".task-done-button")

    if (element.classList.contains("task-done")) {
        element.classList.remove("task-done");
        modifyDoneStatus(doneButton, false);
    } else {
        element.classList.add("task-done");
        modifyDoneStatus(doneButton, true);
    }
}

function removeTask(taskId) {
    tasks = tasks.filter(task => task !== taskId);
    element = document.querySelector(`#${taskId}`);
    element.remove();
}

function modifyDoneStatus(doneButton, done) {
    if (done) {
        doneButton.innerText = "Mark as incomplete"
        doneButton.classList.remove("btn-success");
        doneButton.classList.add("btn-warning");
    } else {
        doneButton.innerText = "Mark as complete";
        doneButton.classList.remove("btn-warning");
        doneButton.classList.add("btn-success");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#new-task-form").addEventListener("submit", addTask);
});