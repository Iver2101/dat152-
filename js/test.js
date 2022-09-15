export default class taskBox extends HTMLElement {
    // show() - Opens (shows) the modal box in the browser window.
    //setStatuseslist(list) – Sets the list of possible task statuses.
    //newtaskCallback(callback) - Adds a callback to run at click on the Add task button.
    //close() - Removes the modal box from the view.
    #shadow;

    //  allStatuses[];

    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'closed' });
        this.#createHTML();
    }

    show() {
        
    }
   
 //   show2 () {
  //      var modalbox = document.getElementById('modalbox')
  //      modalbox.innerHTML('<p></p>')
   //     }

   close () {
        var span = document.getElementsByClassName("close")[0]
        span.onclick = function() {
            modal.style.display = "none";
        }
    }

    
    setStatusesList() {

    }

    newtaskCallback(callback) {

    }

    #createHTML() {
        const wrapper = document.createElement('div');
        wrapper.id = "taskbox";
        const html = 
        `
        <div class="modal">
        <span class="close">&times;</span>
        </div>
        </div>
        `;
        wrapper.insertAdjacentHTML('beforeend',html);
        this.#shadow.appendChild(wrapper);
        

    }
    

}