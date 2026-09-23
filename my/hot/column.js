import Item from "./item.js";
import KanbanAPI from "./KanbanAPI.js";
export default class column {
    constructor(id, title){
        this.elements = {};
        this.elements.root = column.createroot();
        this.elements.title = this.elements.root.querySelector(".kanban__column-title");
        this.elements.items = this.elements.root.querySelector(".kanban__column-items");
        this.elements.additem = this.elements.root.querySelector(".kanban__add-item");
        this.elements.title.textContent = title;
        this.elements.additem.textContent = "+ Add";
        this.elements.root.dataset.id = id;
        this.elements.title.textContent = title;

        this.elements.additem.addEventListener("click", () => {
          const newitem = KanbanAPI.insertItem(id, "");
          this.renderitem(newitem);
        });
        KanbanAPI.getItem(id).forEach(item => {
            this.renderitem(item);
        });
    };
    static createroot() {
        const range = document.createRange();
        range.selectNode(document.body);
        return range.createContextualFragment(`
             <div class="kanban__column">
             <div class="kanban__column-title"></div>
             <div class="kanban__column-items"></div>
             <button class="kanban__add-item" type="button"></button>
             </div>
            `).children[0];
    };
    renderitem(data){
                 const itemInstance = new Item(data.id, data.content);
                this.elements.items.appendChild(itemInstance.elements.root);
                  }

};