export default class column {
    constructor(id, title){
        
    }
    static createroot() {
        const range = document.createRange();
        range.selectNode(document.body);
        return range.createContextualFragment(`
             <div class="kanban__column">
             <div class="kanban__column-title"></div>
             <div class="kanban__items"></div>
             <button class="kanban__add-item" type="button"></button>
             </div>
            `)
    };
};