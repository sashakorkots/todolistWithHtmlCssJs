class Task {
    constructor(id, title, description, dueDate, done) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.done = done;
    }
}


const todolistElement = document.getElementById('todolist')
function appendTask(task, isShowAll) {
    
    todolistElement.appendChild(BuildHtmlTask(task, isShowAll));
}
function BuildHtmlTask(task, isShowAll) {
    const {id, title, description, dueDate, done } = task;
    let listElement = document.createElement('section');
    listElement.setAttribute("id", `taskId=${id}`)
    if (isShowAll && done){
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
function AddButtonForShow(isShowAll) {
    
    buttonElement.appendChild(ButtonTask(isShowAll));
}

function ButtonTask(isShowAll) {
    
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
    todolistElement.innerHTML='';
    todoList.forEach(appendTask);

}
function ListHtml() {
    let mas;
    for (let index = 0; index < todoList.length; index++) {
        mas += BuildHtmlTask(todoList[index]);
        
    }
    return mas;
}






let todoList = [
    new Task(0,'Make class', '', '2021.02.19', true),
    new Task(1,'Make constructor', 'by video', '2021.05.19', false),
    new Task(2,'Listen lesson', '', '2021.05.19', false),
    new Task(3,'Make object', 'in js', '2021.02.19', true),
    new Task(4,'Make function', 'for example arrow function', '2021.05.19', false),
    new Task(5,'Listen lesson', '', '2021.05.19', false),
];

let isShowAll = false;
AddButtonForShow(isShowAll);

todoList.forEach(appendTask, isShowAll);



