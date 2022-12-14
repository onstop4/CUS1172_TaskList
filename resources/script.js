tasks = [];

function addTask(e) {
    e.preventDefault();

    const taskId = `task-${tasks.length + 1}`;
    tasks.push(taskId);

    let taskTitleValue = document.querySelector("#new-task-title").value;
    let taskPriority = document.querySelector("#new-task-priority");
    let taskPriorityValue = taskPriority.value;
    let taskPriorityText = taskPriority.options[taskPriority.selectedIndex].text;
    let taskDoneValue = document.querySelector("#new-task-done").checked;

    if (!checkNewTaskInfo(taskTitleValue, taskPriorityValue, taskDoneValue)) {
        return;
    }

    let elementTitle = document.createElement("p");
    elementTitle.classList.add("task-title");
    elementTitle.innerText = taskTitleValue;

    let elementPriority = document.createElement("p");
    elementPriority.classList.add("fst-italic");
    elementPriority.innerText = `${taskPriorityText} Priority`;

    let doneButton = document.createElement("button");
    doneButton.classList.add("btn", "task-done-button");
    modifyDoneStatus(doneButton, taskDoneValue);
    doneButton.onclick = () => { markTaskAsDone(taskId) };

    let removeButton = document.createElement("button");
    removeButton.classList.add("btn", "btn-danger");
    removeButton.innerText = "Remove"
    removeButton.onclick = () => { removeTask(taskId) };

    let buttonGroup = document.createElement("div");
    buttonGroup.classList.add("btn-group");
    buttonGroup.append(doneButton, removeButton);

    let element = document.createElement("li");
    element.id = taskId
    element.classList.add("task", `task-priority-${taskPriorityValue}`, "my-3", "p-3", "rounded", "shadow-sm");
    if (taskDoneValue) {
        element.classList.add("task-done");
    }
    element.append(elementTitle, elementPriority, buttonGroup);

    document.querySelector("#tasks").append(element);

    e.target.reset();
}

function checkNewTaskInfo(taskTitle) {
    let errorAlert = document.querySelector("#new-task-error-alert");
    if (taskTitle.trim() === "") {
        errorAlert.classList.remove("not-visible");
    } else {
        errorAlert.classList.add("not-visible");
        return true;
    }
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
    document.querySelector("#new-task-form").onsubmit = addTask
});