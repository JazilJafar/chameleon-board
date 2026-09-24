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
        return dropzone;
    };
};