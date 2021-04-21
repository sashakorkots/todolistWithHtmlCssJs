class Task {
    constructor(idOrObject, title, description, dueDate, done) {
        if (typeof idOrObject === 'object') {
            Object.assign(this, idOrObject)
        }
        else {
            this.id = idOrObject;
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
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
    if (dueDate != '' && dueDate != undefined)
        return `<div ${OverDueDate(dueDate)}> DueDate: ${dueDate} </div>`;
    else
        return '';
}
function OverDueDate(dueDate) {

    let date = new Date(dueDate);

    let now = new Date();
    if (date < now) {
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

    buttonElement.appendChild(ButtonShowTask());
}

function ButtonShowTask() {

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
    buttonElement.replaceChild(ButtonShowTask(isShowAll), this);
    todolistElement.innerHTML = '';
    todoList.forEach(appendTask);

}





const taskForm = document.getElementById('add-task');

function AddButtonAddTask() {

    buttonElement.appendChild(ButtonAddTask());
}

function ButtonAddTask() {

    let button = document.createElement('button');
    button.innerText += 'Add task';
    button.onclick = CreateForm;

    return button;
}



function CreateForm(event) {
    let form = document.createElement('form');
    form.setAttribute("name","task");
    form.setAttribute("class", "form-for-task");
    form.innerHTML += '<h3><input type="text" name="title" placeholder="Title"></h3>' +
        '<input type="text" name="description" placeholder="Description">' +
        '<input type="date" name="dueDate" placeholder="DueDate">' +
        '<div>' +
            '<button type="submit">Save new task</button>' +
        '</div>' ;
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let taskFormData = new FormData(taskForm)
        let task = Object.fromEntries(taskFormData.entries());
        task.id = todoList.length;
        task.done = false
        let currentTask = new Task(task);
        todoList.push(currentTask);
        appendTask(currentTask);
        console.log(todoList);
        taskForm.reset();
    });
    console.log(form);
    taskForm.appendChild(form);
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



