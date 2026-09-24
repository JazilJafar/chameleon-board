import KanbanAPI from "./KanbanAPI.js";
export default class item {
    constructor(id, content) {
      this.elements = {};
      this.elements.root = item.createroot();
      this.elements.input = this.elements.root.querySelector(".kanban__item-input");

      this.elements.root.dataset.id = id;
      this.elements.input.textContent = content;
      this.content = content;
      
      const onedit = () => {
        const newcontent = this.elements.input.textContent.trim();
        if(newcontent == this.content){
          return;
        }
        this.content = newcontent;
        KanbanAPI.updateItem(id, {
          content: this.content
        });
      };
      this.elements.input.addEventListener("blur", onedit);
      this.elements.root.addEventListener("dblclick", () => {
         const check = confirm("are you shure to delete this hot thing?");
         if(check){
          KanbanAPI.deleteitem(id);
          this.elements.input.removeEventListener("blur", onedit);
          this.elements.root.parentElement.removeChild(this.elements.root);
         };
      });
    };
    static createroot(){
       const range = document.createRange();
       range.selectNode(document.body);
       return range.createContextualFragment (`
         <div class="kanban__item" draggable="true">
         <div class="kanban__item-input" contenteditable></div>
         </div>
        `).children[0];
    };
};