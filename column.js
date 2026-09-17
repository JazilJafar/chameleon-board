import KanbanAPI from "./KanbanAPI.js";

export default class Column {
    constructor(id, title){
      this.elements = {};
      this.elements.root = Column.createRoot();
      this.elements.title = this.elements.root.querySelector(".kanban__column-title");
      this.elements.items = this.elements.root.querySelector(".kanban__column-items");
      this.elements.addItem = this.elements.root.querySelector(".kanban__add-item");
      
      this.elements.root.dataset.id = id;
      this.elements.title.textContent = title;

      this.elements.addItem.addEventListener("click", () => {
         
      });

      KanbanAPI.getItems(id).forEach(item => {
        this.renderItem(item);
      });
    }
    static createRoot(){
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
            <div class="kanban__column">
            <div class="kanban__column-title"></div>
            <div class="kanban__column-items"></div>
            <button type="button" class="kanban__add-item">+add</button>
        </div>
        `).children[0];
    };
    renderItem(data){
     
    }
};