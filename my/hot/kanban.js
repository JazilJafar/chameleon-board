import column from "./column.js";

export default class kanban {
    constructor(root) {
        this.root = root;
        kanban.columns().forEach(columnData => {
            const columnview = new column(columnData.id, columnData.title);
            this.root.appendChild(columnview.elements.root);
        });
    }

    static columns() {
        return [
            {
                id: 1,
                title: "Spark 🧨"
            },
            {
                id: 2,
                title: "On Fire 🔥"
            },
            {
                id: 3,
                title: "Ash ⚱️"
            }
        ];
    }
}