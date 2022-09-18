export default class taskList extends HTMLElement {
    #shadow;
    #callbacks = new Map();
    #count = 0;
    #statuses = [];
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'closed' })
        this.#createHTML();
        this.#shadow.getElementById('addBtn').addEventListener("click", this.#addTask.bind(this));

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
this.setStatusesList(["WATING","ACTIVE","DONE"]);

this.showTask(newtask2);

this.showTask(newtask);

this.changestatusCallback(
    (id, newStatus) => {
        console.log(`User chose ${newStatus} for task ${id}`)
    })
this.enableAddTask()
this.deleteTaskCallback(
    (id) => {
        console.log(`Click event on delete button of task ${id}`)
    }
);
this.#shadow.querySelectorAll("button.remove").forEach(x => x.addEventListener("click",this.#deleteTask.bind(this)))

    }
 

    showTask(task) {

        this.#count++;

        if(this.#count == 1) {
            this.#shadow.querySelector("table").insertAdjacentHTML("afterbegin","<tr id=header><th>Task</th><th>Status</th></tr>")
        }
        const content = `<tr id='tr${task.id}'><td id=title${task.id}>${task.title}</td><td id='status${task.id}'>${task.status}</td>${this.#makeButtons(task.id)}</tr>`
        this.#shadow.getElementById("header").insertAdjacentHTML('afterend', content);
        this.#shadow.getElementById('topText').innerHTML = "Found " + this.#count + " tasks."
        this.#shadow.querySelector("select").addEventListener("click", this.#statusChanged.bind(this));
        this.#setStatuses()


    }

    #makeButtons(id) {
        return "<td><select name='modify' id='status" + id + "'></select> <button class='remove' id='remove" + id + "'>Remove</button></td>"
    }

    updateTask(status) {
        this.#shadow.getElementById("status" + status.id).innerHTML = status.status;

    }


    removeTask(id) {
        const obj = this.#shadow.getElementById("tr" + id);
        obj.remove();
        this.#count--;
        if(this.#count === 0) {
            this.#shadow.getElementById('topText').innerHTML = "No tasks were found"
            this.#shadow.getElementById('header').remove();
        } else {
            this.#shadow.getElementById('topText').innerHTML = "Found " + this.#count + " tasks."
        }
    }

    setStatusesList(names) {
        this.#statuses = names;
    }

    #setStatuses() {
        const elem = this.#shadow.querySelector("select");
        let out = "<option selected>&lt;modify&gt</option>";
        this.#statuses.forEach(x =>  out = out.concat(`<option value=${x}>${x}</option>`))
        elem.insertAdjacentHTML('beforeend',out);
    }
    
    

    enableAddTask() {
        this.#shadow.getElementById('addBtn').disabled = false;
    }   

    #addTask(event) {
        if (this.#callbacks.get("addTask") != null) this.#callbacks.get("addTask")()
    }

    addTaskCallback(func) {
        this.#callbacks.set('addTask', func)

    }


    #statusChanged(event) {
        if(this.#callbacks.get("status") != null && event.target.value != '<modify>') {
            const id = event.target.id.slice(-1)
            const newStatus = event.target.value
            if (window.confirm(`Set '${this.#shadow.getElementById('title' + id).innerHTML} to ${newStatus}`))
                this.#callbacks.get("status")(id, newStatus)
        }
    }
    changestatusCallback(func) {
        this.#callbacks.set('status', func);
        }




    #deleteTask(event) {
        if(this.#callbacks.get("delete") != null) {
            const id = event.target.id.slice(-1)
            if(window.confirm(`Delete task ${this.#shadow.getElementById('title' + id).innerHTML}`)) {
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
        const content = "<p id='topText'>Waiting for server data</p> <Button id='addBtn' Disabled>New Task</button> <table></table>"
        wrapper.insertAdjacentHTML('beforeend', content);
        this.#shadow.appendChild(wrapper);
    }

}