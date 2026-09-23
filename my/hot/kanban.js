export default class kanban {
    constructor(root){
      this.root = root;
      kanban.columns().forEach(column => {

      })
    };
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
    };
};