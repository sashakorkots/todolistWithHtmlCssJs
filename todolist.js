class Task{
    constructor(title, description, dueDate, done) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.done = done;
    }
}


const todolistElement = document.getElementById('todolist')
function appendTask(task) {
    todolistElement.innerHTML += 
    '<section>' +
        `<h3 ${IsComplete(task.done)}>${task.title}</h3>` +
        '<div class="checkbox">' +
            `<input type="checkbox" name="done" value="" ${IsCheck(task.done)}>` +
        '</div>' + 
            WriteDescription(task.description) +
            WriteDueDate(task.dueDate) +
    '</section>';
}

function IsComplete(done) {
    if (done) {
        return 'class="task-complete"'
    }
}
function IsCheck(done) {
    if (done){
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

let todoList = [
    new Task('Make class','','2021.02.19',true),
    new Task('Make constructor','by video','2021.05.19', false),
    new Task('Listen lesson','','2021.05.19',false),
    new Task('Make object','in js','2021.02.19',true),
    new Task('Make function','for example arrow function','2021.05.19', false),
    new Task('Listen lesson','','2021.05.19',false),
];


todoList.forEach(appendTask);



