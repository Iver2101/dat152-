export default class taskList extends HTMLElement {
    #shadow;
    #callbacks = new Map();
    #callbackID = 0;
    #count = 0;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'closed' })
        this.#createHTML();
const newtask = {
    "id": 1,
    "title": "Do DAT152 home work",
    "status": "ACTIVE"
};
this.showTask(newtask);
const status = {
    "id": 1,
    "status": "DONE"
};
this.updateTask(status);

this.setStatusesList();
    this.changestatusCallback((id, newStatus) => {
        console.log(`User chose ${newStatus} for task ${id}`)
    })

    }


    showTask(task) {

        const taskObject = document.createElement('fieldset');
        taskObject.id = "fieldset" + task.id;
        const content = "<label for='task'>" + task.title + "</label><label for='status' id='status" +task.id+ "'>" + task.status + "</label>" + this.#makeButtons(task.id)
        taskObject.insertAdjacentHTML('beforeend', content);
        this.#shadow.getElementById('form').insertAdjacentElement('afterbegin', taskObject);
        this.#count++;
        this.#shadow.getElementById('topText').innerHTML = "Found " + this.#count + " tasks."

    }

    #makeButtons(id) {
        return "<select name='modify' id='status" + id + "'></select> <input type='submit' value='remove' id='remove" + id + "'>"
    }

    updateTask(status) {
        this.#shadow.getElementById("status" + status.id).innerHTML = status.status;

    }


    removeTask(id) {
        const obj = this.#shadow.getElementById("fieldset" + id);
        obj.remove();
        this.#count--;
        if(this.#count == 0) {
            this.#shadow.getElementById('topText').innerHTML = "No tasks were found"

        }
        this.#shadow.getElementById('topText').innerHTML = "Found " + this.#count + " tasks."
    }

    setStatusesList() {
        const elems = this.#shadow.querySelectorAll("select");
        elems.forEach(this.addOptions.bind(this))
    }
    
    
    addOptions(element) {
        element.innerHTML =  "<option value='ACTIVE'>&lt;ACTIVE</option> <option value='DONE'>DONE</option> <option value='WAITING'>WAITING</option>"

    }


    enableAddTask() {
        this.#shadow.getElementById('addBtn').disabled = false;
    }

    addTaskCallback(func) {
        this.#shadow.getElementById('addBtn').addEventListener("click", func);

    }

    changestatusCallback(func) {
        const objs = this.#shadow.querySelectorAll("select")
        objs.forEach(x => x.addEventListener('click', func))
    }



    noTask() {
        if(this.#count == 0) {
            this.#shadow.getElementById('topText').innerHTML = "No tasks were found"
            return true
        }
        return false
    }


    #createHTML() {
        const wrapper = document.createElement('div');
        wrapper.id = "wrapper";
        const content = "<p id='topText'>Waiting for server data</p> <Button id='addBtn' Disabled>New Task</button> <form id='form'></form>"
        wrapper.insertAdjacentHTML('beforeend', content);
        this.#shadow.appendChild(wrapper);
    }

}