import KanbanAPI from "./KanbanAPI.js";
export default class dropzone {
    static createdropzone(){
        const range = document.createRange();
        range.selectNode(document.body);
        const dropzone = range.createContextualFragment(`
             <div class="kanban__dropzone"></div>
            `).children[0];

        dropzone.addEventListener("dragover", e => {
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
            const dropincol = Array.from(columnelement.querySelectorAll(".kanban__dropzone"));
            const dropindex = dropincol.indexOf(dropzone);
            const itemId = Number(e.dataTransfer.getData("text/plain"));
            const droppitemelement = document.querySelector(`[data-id="${itemId}"]`);
            const insertafter = dropzone.parentElement.classList.contains("kanban__item") ? dropzone.parentElement : dropzone;
            insertafter.after(droppitemelement);
            console.log(insertafter);
            KanbanAPI.updateItem(itemId, {
    columnId: columnid,
    position: dropindex
});
        });
        return dropzone;
    };
};