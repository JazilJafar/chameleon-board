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
             dropzone.classList.remove("kanban__dropzone--active")
           });
        return dropzone;
    };
};