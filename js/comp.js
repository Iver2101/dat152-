export default class taskList extends HTMLElement {
    #shadow;
    #callbacks = new Map();

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
const newtask2 = {
    "id": 2,
    "title": "Do DAT152 home work",
    "status": "ACTIVE"
};
this.showTask(newtask2);
this.showTask(newtask);

this.changestatusCallback(
    (id, newStatus) => {
        console.log(`User chose ${newStatus} for task ${id}`)
    })
    this.#shadow.querySelectorAll("select").forEach(x => x.addEventListener("click",this.#statusChanged.bind(this)))
this.enableAddTask()
this.addTaskCallback(
    () => { console.log("Click event on 'New task button'") }
);
this.#shadow.getElementById('addBtn').addEventListener("click", this.#aaa.bind(this));
this.deleteTaskCallback(
    (id) => {
        console.log(`Click event on delete button of task ${id}`)
    }
);
this.#shadow.querySelectorAll("button.remove").forEach(x => x.addEventListener("click",this.#aaaa.bind(this)))

    }


    showTask(task) {

        const taskObject = document.createElement('fieldset');
        taskObject.id = `fieldset ${task.id}`;
        const content = `<label for='task' id=label${task.id}>` + task.title + "</label><label for='status' id='status" +task.id+ "'>" + task.status + "</label>" + this.#makeButtons(task.id)
        taskObject.insertAdjacentHTML('beforeend', content);
        this.#shadow.getElementById('form').insertAdjacentElement('afterbegin', taskObject);
        this.#count++;
        this.#shadow.getElementById('topText').innerHTML = "Found " + this.#count + " tasks."

    }

    #makeButtons(id) {
        return "<select name='modify' id='status" + id + "'></select> <button class='remove' id='remove" + id + "'>New Task</button>"
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

        } else {
            this.#shadow.getElementById('topText').innerHTML = "Found " + this.#count + " tasks."
        }
    }

    setStatusesList(names) {
        const elems = this.#shadow.querySelectorAll("select");
        elems.forEach(x => this.addOptions(x, names))
    }
    
    
    addOptions(element, names) {
        let out = "<option selected>&lt;modify&gt</option>";
        names.forEach(x =>  out = out.concat(`<option value=${x}>${x}</option>`))
        element.insertAdjacentHTML('beforeend',out);

    }


    enableAddTask() {
        this.#shadow.getElementById('addBtn').disabled = false;
    }   

    #aaa(event) {
        if (this.#callbacks.get("addTask") != null) this.#callbacks.get("addTask")()
    }

    addTaskCallback(func) {
        this.#callbacks.set('addTask', func)

    }


    #statusChanged(event) {
        // finn nye status  legg status, og id i data
        // Hvis callbackStatus ikke er null
        if(this.#callbacks.get("status") != null && event.target.value != '<modify>') {
            const id = event.target.id.slice(-1)
            const newStatus = event.target.value
            if (window.confirm(`Set '${this.#shadow.getElementById('label' + id).innerHTML} to ${newStatus}`))
                this.#callbacks.get("status")(id, newStatus)
        }
    }
    changestatusCallback(func) {
        this.#callbacks.set('status', func);
        }




    #aaaa(event) {
        if(this.#callbacks.get("delete") != null) {
            const id = event.target.id.slice(-1)
            if(window.confirm(`Delete task ${this.#shadow.getElementById('label' + id).innerHTML}`)) {
                this.#callbacks.get("delete")(id)
            }
        }
    }    
    
        
    deleteTaskCallback(func){
        this.#callbacks.set('delete', func)
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