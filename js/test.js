export default class taskBox extends HTMLElement {
    // show() - Opens (shows) the modal box in the browser window.
    //setStatuseslist(list) – Sets the list of possible task statuses.
    //newtaskCallback(callback) - Adds a callback to run at click on the Add task button.
    //close() - Removes the modal box from the view.
    #shadow;

    //  allStatuses[];

    constructor() {
        super();

        //modal
        this.modalBox;
        //button that opens the modal
        this.addNewTaskBtn;

        this.#shadow = this.attachShadow({ mode: 'closed' });
        this.#createHTML();
        this.#createCSSlink();

        const btn = this.#shadow.querySelector("button");
        btn.addEventListener("click", () => {
            const modal = this.#shadow.querySelector(".modalBox");
            console.log(btn);
            console.log(modal);
            const input = modal.getElementsByTagName("input")[0].value;
            const status = modal.getElementsByTagName("select")[0].value;
            const task = {title: input, status: status};

            this.onsubmit(task);
        }, true);

        const close = this.#shadow.querySelector(".close");
        close.addEventListener("click", () => {
            this.close();
        }, true);
    }

    show() {
        this.#shadow.querySelector(".modalBox").style.display = "block";
        
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
        //this.#shadow.querySelector(".modalBox").style.display = "none";
    }

    
    setStatusesList() {

    }

    newtaskCallback(callback) {
        this.onsubmit = callback;
    }

    //#createHTML() {
      //  const wrapper = document.createElement('div');
      //  wrapper.id = "taskbox";
      //  const html = 
      //  `
      //  <div class="modal">
      //  <span class="close">&times;</span>
      //  </div>
      //  </div>
      //  `;
      //  wrapper.insertAdjacentHTML('beforeend',html);
      //  this.#shadow.appendChild(wrapper);
        
    //}
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
        <div class = "modalBox-content">
            <span class="close">&times;</span>
            
            <table>
                <tr><th>Title:</th>
                <td><input type="text"/></td></tr>
                <tr><th>Status:</th>
                <td><select></select></td><tr>
            </table>
            
            <p><button class = "delBtn" type="submit">Add Task</button></p>
        </div>
    `;
    const wrapper = document.createElement('div');
    wrapper.classList = "modalBox";
    console.log(this.#shadow.querySelector(".modalBox"));
    wrapper.id = "taskbox";
    wrapper.insertAdjacentElement('beforeend', html);
    this.#shadow.appendChild(wrapper);
    this.modalBox = wrapper;
    return wrapper;

    }
    

}