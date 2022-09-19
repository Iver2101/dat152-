export default class taskBox extends HTMLElement {
    // show() - Opens (shows) the modal box in the browser window.
    //setStatuseslist(list) – Sets the list of possible task statuses.
    //newtaskCallback(callback) - Adds a callback to run at click on the Add task button.
    //close() - Removes the modal box from the view.
    #shadow;
    #callback;
    #ids = 0;


    constructor() {
        super();

        //modal
        this.modalBox;
        //button that opens the modal

        this.#shadow = this.attachShadow({ mode: 'closed' });
        this.#createHTML();
        this.#shadow.getElementById("addBtn").addEventListener("click", this.#newTask.bind(this))
        this.#shadow.getElementById("closeBtn").addEventListener("click", () => this.close())
    }

    show() {
        this.#shadow.querySelector("dialog").showModal()
    }



   close () {
        this.#shadow.querySelector("dialog").close()

    }




    setStatusesList(names) {
        const elem = this.#shadow.querySelector("select");
        let out = "";
        names.forEach(x =>  out = out.concat(`<option value=${x}>${x}</option>`))
        elem.insertAdjacentHTML('beforeend',out);
    }

    newtaskCallback(callback) {
        this.#callback = callback;

    }


    #newTask(event) {
        const task = {
            "id" : this.#ids++,
            "title" : this.#shadow.getElementById("newTasktxt").value,
            "status" : this.#shadow.querySelector("select").value
        }
        if(this.#callback != null) this.#callback(task)
        
    }


    #createCSSlink() {
        // create a new link tag
        const link = document.createElement('link');

        // set properties of link tag
        link.href = 'taskbox.css';
        link.rel = 'stylesheet';
        link.type = 'text/css';

        //append link element to html
        document.body.appendChild(link)
        // eller? : this.#shadow.appendChild(link);
        return link;

    }

   
    #createHTML(){
        const html = `
        <head>
            <link rel="stylesheet" href="taskbox.css">
        </head>
        
       
            <label for="title">Title : </label>
            <input type="text" id="newTasktxt">
            <label for="status">Status : </label>
            <select id="select">
            </select>
            <button id=addBtn>Add task</button>
            <button id=closeBtn> X </button>


    `
        
    const wrapper = document.createElement('dialog');
    wrapper.id = "taskbox";
    wrapper.insertAdjacentHTML('beforeend', html);
    this.#shadow.appendChild(wrapper);
    this.modalBox = wrapper;
    return wrapper;
    }

}