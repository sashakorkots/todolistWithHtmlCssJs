class Task {
    constructor(idOrObject, title, description, dueDate, done) {
        if (typeof idOrObject === 'object') {
            Object.assign(this, idOrObject)
        }
        else {
            this.id = idOrObject;
            this.title = title;
            this.description = description;
            this.dueDate = new Date(dueDate);
            this.done = done;
        }
    }
}

let isShowAll = false;
const todolistElement = document.getElementById('todolist')
function appendTask(task) {

    todolistElement.appendChild(BuildHtmlTask(task));
}
function BuildHtmlTask(task) {
    const { id, title, description, dueDate, done } = task;
    let listElement = document.createElement('section');
    listElement.setAttribute("id", `taskId=${id}`)
    if (isShowAll && done) {
        listElement.setAttribute("class", "show-not-all-task");
    }
    let htmlTags =
        `<h3 ${IsComplete(done)}>${title}</h3>` +
        '<div class="checkbox">' +
        `<input type="checkbox" name="done" value="" ${IsCheck(done)}></input>` +
        '</div>' +
        WriteDescription(description) +
        WriteDueDate(dueDate) +
        `<button>X</button>`;
    listElement.innerHTML += htmlTags
    listElement.onclick = RemoveTask;
    return listElement;
}


function RemoveTask(event) {
    let index = FindById(this.id.split('=')[1]);
    if (event.target.tagName === 'BUTTON') {

        todoList.splice(index, 1)
        this.remove();
    }
    else if (event.target.tagName === 'INPUT') {
        todoList[index].done = event.target.checked;
        todolistElement.replaceChild(BuildHtmlTask(todoList[index]), this)
    }
}


function IsComplete(done) {
    if (done) {
        return 'class="task-complete"'
    }
}
function IsCheck(done) {
    if (done) {
        return "checked";
    }
    else if (!done) {
        return '';
    }
}

function WriteDescription(description) {
    if (description != '' && description != undefined)
        return `<p> Description: ${description} </p>`;
    else
        return '';
}
function WriteDueDate(dueDate) {
    if (dueDate != '' && dueDate != undefined && dueDate != 'Invalid Date')
        return `<div ${OverDueDate(dueDate)}> DueDate: ${new Date(dueDate).toDateString()} </div>`;
    else
        return '';
}
function OverDueDate(dueDate) {
    let now = new Date();
    if (dueDate < now) {
        return 'class="over-due-date"'
    }
}
function FindById(id) {
    for (let index = 0; index < todoList.length; index++) {
        if (id == todoList[index].id) {
            return index;
        }

    }
}




let buttonElement = document.querySelector("header");
function AddButtonForShow() {

    buttonElement.appendChild(ButtonTask());
}

function ButtonTask() {

    let button = document.createElement('button');
    if (isShowAll) {
        button.innerText += 'show all tasks';
    }
    else {
        button.innerText += 'show only no done task';
    }
    button.onclick = ShowAllTask;

    return button;
}
function ShowAllTask(event) {
    isShowAll = !isShowAll;
    buttonElement.replaceChild(ButtonTask(isShowAll), this);
    todolistElement.innerHTML = '';
    todoList.forEach(appendTask);

}
let isShowForm = false;
const taskForm = document.forms['task'];
function AddButtonAddTask() {

    buttonElement.appendChild(ButtonAddTask());
}

function ButtonAddTask() {

    let button = document.createElement('button');
    button.innerText += 'Add task';
    button.onclick = showForm;
    return button;
}

function showForm(event) {
    if (!isShowForm) {

        taskForm.classList.remove('show-form');
    }
    else {
        taskForm.classList.add('class', 'show-form');
    }
    isShowForm = !isShowForm;
}



let todoList = [
    new Task(0, 'Make class', '', '2021.02.19', true),
    new Task(1, 'Make constructor', 'by video', '2021.05.19', false),
    new Task(2, 'Listen lesson', '', '2021.05.19', false),
    new Task(3, 'Make object', 'in js', '2021.02.19', true),
    new Task(4, 'Make function', 'for example arrow function', '2021.05.19', false),
    new Task(5, 'Listen lesson', '', '2021.05.19', false),
];


AddButtonForShow(isShowAll);
AddButtonAddTask();

todoList.forEach(appendTask);




taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let taskFormData = new FormData(taskForm)
    let task = Object.fromEntries(taskFormData.entries());
    task.id = todoList[todoList.length].id + 1;
    task.dueDate = new Date(task.dueDate);
    task.done = false
    let currentTask = new Task(task);
    if (currentTask.title == '') {
        alert('title has not inputed')
    }
    else {
        
        todoList.push(currentTask);
        appendTask(currentTask);
        
        taskForm.classList.add('show-form');
        isShowForm = !isShowForm;
        taskForm.reset();
    }
    
});
