export default class item {
    constructor(id, content) {
      this.elements = {};
      this.elements.root = item.createroot();
      this.elements.input = this.elements.root.querySelector(".kanban__item-input");

      this.elements.root.dataset.id = id;
      this.elements.input = content;
      this.content = content;
      
      const onedit = () => {
        const newcontent = this.elements.input.textContent.trim();
      };
      this.elements.input.add
    };
    static createroot(){
       const range = document.createRange();
       range.selectNode(document.body);
       return range.createContextualFragment (`
         <div class="kanban__item" draggable="true">
         <div class="kanban__item-input" contenteditable></div>
         </div>
        `).children[0];
    }
};