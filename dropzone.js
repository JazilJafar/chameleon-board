export default class dropzone {
    static createdropzone() {
        const range = document.createRange();
        range.selectNode(document.body);
        const dropzone = range.createContextualFragment(`
            <div class="kanban__dropzone"> </div>
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
            const droppeselm = document.querySelector(`[data-id="${itemId}"]`);

            console.log(droppeselm);
           });
        return dropzone;
    };
};