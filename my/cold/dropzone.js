import KanbanAPI from "./KanbanAPI.js";

export default class dropzone {
    static createdropzone() {
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
            dropzone.classList.remove("kanban__dropzone--active");
        });

        dropzone.addEventListener("drop", e => {
            e.preventDefault();
            dropzone.classList.remove("kanban__dropzone--active");

            const columnElement = dropzone.closest(".kanban__column");
            const columnId = Number(columnElement.dataset.id);
            const dropzoneincolumn = Array.from(columnElement.querySelectorAll(".kanban__dropzone"));
            const dropindex = dropzoneincolumn.indexOf(dropzone);
            const itemId = Number(e.dataTransfer.getData("text/plain"));
            const droppedItemElement = document.querySelector(`[data-id="${itemId}"]`);

            // 1. Prevent dropping an item into its own inner dropzone
            if (droppedItemElement.contains(dropzone)) {
                return;
            }

            // 2. Determine target element to place after
            const insertAfter = dropzone.parentElement.classList.contains("kanban__item")
                ? dropzone.parentElement
                : dropzone;

            // 3. Move the DOM element
            insertAfter.after(droppedItemElement);

            // 4. Persist change to localStorage
            KanbanAPI.updateItem(itemId, {
                columnId,
                position: dropindex
            });
        });

        return dropzone;
    }
}