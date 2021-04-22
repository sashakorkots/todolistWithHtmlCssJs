class Task {
    constructor(myTaskId, title, description, dueDate, done) {
        if (typeof myTaskId === 'object') {
            Object.assign(this, myTaskId)
        }
        else {
            this.myTaskId = myTaskId;
            this.title = title;
            this.description = description;
            this.dueDate = new Date(dueDate);
            this.done = done;
        }
    }
}
const ListId = 3;
let isShowAll = false;
const todolistElement = document.getElementById('todolist');
function appendTask(task) {
   /*  console.log(task); */
    todolistElement.appendChild(BuildHtmlTask(task));
}
function BuildHtmlTask(task) {
    
    const {myTaskId, title, description, doDate, done} = task;
    console.log(myTaskId);
    let listElement = document.createElement('section');
    listElement.setAttribute("id", `taskId=${myTaskId}`)
    if (isShowAll && done) {
        listElement.setAttribute("class", "show-not-all-task");
    }
    let htmlTags =
        `<h3 ${IsComplete(done)}>${title}</h3>` +
        '<div class="checkbox">' +
        `<input type="checkbox" name="done" value="" ${IsCheck(done)} ></input>` +
        '</div>' +
        WriteDescription(description) +
        WriteDueDate(doDate) +
        `<button>Delete task</button>`;
    listElement.innerHTML += htmlTags
    listElement.onclick = ClickOnTask;
    return listElement;
}


function ClickOnTask(event) {
    const index = this.id.split('=')[1];
    
    if (event.target.tagName === 'BUTTON') {
        this.remove();
        DeleteTask(ListId, index);
    }
    else if (event.target.tagName === 'INPUT') {
        let currentTask = {'done' : `${event.target.checked}`};
        /* console.log(UpdateTask(ListId, index,currentTask)); */
        UpdateTask(ListId, index,currentTask)
            .then(task => todolistElement.replaceChild(BuildHtmlTask(task), this))
        
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
    if (dueDate != '' && dueDate != null)
        return `<div ${OverDueDate(dueDate)}> DueDate: ${new Date(dueDate).toDateString()} </div>`;
    else
        return '';
}
function OverDueDate(dueDate) {
    let now = new Date();
    if (new Date(dueDate) < now) {
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
    getListOfTasks(3);

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





taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let taskFormData = new FormData(taskForm)
    let task = Object.fromEntries(taskFormData.entries());

    if (task.doDate != null) {
        task.doDate = task.doDate;
    }
    task.done = false
    let currentTask = task;
    if (currentTask.title == '') {
        alert('title has not inputed')
    }
    else {
        taskForm.classList.add('show-form');
        isShowForm = !isShowForm;

        CreateTask(ListId,currentTask)
            .then(task => appendTask(task))
            .then(_ => taskForm.reset());
    }

});



/* 
web api 
*/



function getListOfTasks(listId) {
    const taskListEndpoint = `http://localhost:5000/api/ToDoLists/lists/${listId}/tasks`;
    fetch(taskListEndpoint)
        .then(response => response.json())
        .then(tasks => tasks.forEach(appendTask));
}
function UpdateTask(listId, taskId, task) {
    const taskListEndpoint = `http://localhost:5000/api/ToDoLists/list/3/task/${taskId}`;
    return fetch(taskListEndpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    .then(response => response.json());
}
function CreateTask(listId, task) {
    const taskListEndpoint = `http://localhost:5000/api/ToDoLists/list/3/task`;
    return fetch(taskListEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    .then(response => response.json());
}
function DeleteTask(listId, taskId) {
    const taskListEndpoint = `http://localhost:5000/api/ToDoLists/list/3/task/${taskId}`;
    return fetch(taskListEndpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json());
}




AddButtonForShow(isShowAll);
AddButtonAddTask();


getListOfTasks(ListId);

