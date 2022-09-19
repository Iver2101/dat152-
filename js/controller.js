import TaskList from './tasklist.js'
import TaskBox from './taskbox.js'

customElements.define('task-list', TaskList);
customElements.define('task-box', TaskBox);

const taskl = document.querySelector("TASK-LIST")
const taskb = document.querySelector("TASK-BOX")


taskb.newtaskCallback(addTasks.bind(this));
taskl.changestatusCallback(updateTask.bind(this));
taskl.deleteTaskCallback(deleteTask.bind(this));
taskl.addTaskCallback(taskb.show.bind(taskb));



async function getStatuses() {
    try {
        const response = await fetch("../api/services/allstatuses", {method: "GET"});

        if(response.responseStatus) {
            taskb.setStatusesList(response.allstatuses)
            taskl.SetStatusesList(response.allstatuses)
        }
    } catch(e) {
        console.log(e.message)
    }
}

async function showTasks() {
    try {
        const response = await fetch("../TaskServices/api/services/tasklist", {method: "GET"});
        
        if(response.responseStatus) {
            response.tasks.forEach((x) => taskl.showTask(x));
        }
    } catch(e) {
        console.log(e.message)
    }
}

async function addTasks(title, status) {
    const data = {
        "title" : title,
        "status" : status
    }

    const requestSettings = {
        "method" : "POST",
        "headers" : { "Content -Type": "application/json; charset=utf -8" },
        "body" : JSON.stringify(data),
        "cache" : "no-cache",
        "redirect" : "error"
        
    };
    try {
        const response = await fetch("../TaskServices/api/services/task", requestSettings);
        const obj = await response.json();
        if(obj.responseStatus) taskl.showTask(obj);

    } catch(e) {
        console.log(e.message)
    }
}

async function updateTask(id,status) {
    const data = {
        "status" : status
    }

    const requestSettings = {
        "method" : "PUT",
        "headers" : { "Content -Type": "application/json; charset=utf -8" },
        "body" : JSON.stringify(data),
        "cache" : "no-cache",
        "redirect" : "error"
        
    };

    try {
        const response = await fetch(`../TaskServices/api/services/task/${id}`, requestSettings);
        const obj = await response.json();
        if(obj.responseStatus) taskl.update(obj);
    } catch(e) {
        console.log(e.message)
    }


}


async function deleteTask(id) {

    try {
        const response = await fetch(`../TaskServices/api/services/task/${id}`, {method : "DELETE"});
        if(response.responseStatus)
        taskl.removeTask(response.id);
    } catch(e) {
        console.log(e.message)
    }


}


function init() {
    getStatuses();
    showTasks()
}