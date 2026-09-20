import dropzone from "./dropzone.js";
import KanbanAPI from "./KanbanAPI.js";

export default class Item {
    constructor(id, content){
        const bottomdropzone = dropzone.createdropzone();
        this.elements = {};
        this.elements.root = Item.createRoot();
        this.elements.input = this.elements.root.querySelector(".kanban__item-input");
        
        this.elements.root.dataset.id = id;
        this.elements.input.textContent = content;
        this.content = content;
        
        this.elements.root.appendChild(bottomdropzone);
        
        const onblur = () => {
            const newcontent = this.elements.input.textContent.trim();
            if (newcontent == this.content) {
                return;
            }
            this.content = newcontent;

            KanbanAPI.updateItem(id, {
                content: this.content
            });
        };

        this.elements.input.addEventListener("blur", onblur);
        
        this.elements.root.addEventListener("dblclick", () => {
            const check = confirm("are you sure to delete this winter item❄️");

            if(check) {
                KanbanAPI.deleteItem(id);
                this.elements.input.removeEventListener("blur", onblur);
                this.elements.root.parentElement.removeChild(this.elements.root);
            }
        });
        this.elements.root.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain", id);
        });
        
        this.elements.input.addEventListener("drop", e => {
            e.preventDefault();
        });
    }

    static createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
             <div class="kanban__item" draggable="true">
                 <div class="kanban__item-input" contenteditable></div>
             </div>
            `).children[0]; 
    }
}