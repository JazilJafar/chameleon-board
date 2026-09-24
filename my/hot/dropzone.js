export default class dropzone {
    static createdropzone(){
        const range = document.createRange();
        range.selectNode(document.body);
        const dropzone = range.createContextualFragment(`
             <div class="kanban__dropzone"></div>
            `).children[0];

        dropzone.addEventListener("dargover", e => {
            e.preventDefault();
            dropzone.classList.add("kanban__dropzone--active");
        });
        dropzone.addEventListener("dragleave", () => {
          dropzone.classList.remove("kanban__dropzone--active")
        });
        dropzone.addEventListener("drop", e => {
            e.preventDefault();
            dropzone.classList.remove("kanban__dropzone--active");

            const columnelement = dropzone.closest(".kanban__column");
            const columnid = Number(columnelement.dataset.id);
            console.log(columnelement, columnid);
        });
        return dropzone;
    };
};