const STORAGE_KEY = "chameleon-board-treasure-tasks";

const dialog = document.querySelector("#task-dialog");
const form = document.querySelector("#task-form");
const titleInput = document.querySelector("#task-title");
const descriptionInput = document.querySelector("#task-description");
const statusInput = document.querySelector("#task-status");
const dialogTitle = document.querySelector("#dialog-title");
const taskSummary = document.querySelector("#task-summary");

const statuses = ["todo", "progress", "done"];
let tasks = loadTasks();
let editingTaskId = null;
let draggedTaskId = null;

function loadTasks() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

        if (!Array.isArray(saved)) return[];

        return saved.filter((task) => 
            task &&
            typeof task.id === "string" &&
            typeof task.title === "string" &&
            typeof task.description === "string" &&
            statuses.includes(task.status)
        );
    } catch {
        return [];
    }
}

function saveTasks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error("Could not save board tasks: ", error);
    }
}

function createActionButton(text, className, action, id) {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = text;
    button.className = className;
    button.dataset.action = action;
    button.dataset.id = id;

    return button;
}

function createTaskCard(task) {
    const card = document.createElement("article");
    card.className = "task-card";
    card.draggable = true;
    card.dataset.id = task.id;

    const title = document.createElement("h3");
    title.textContent = task.title;
    card.append(title);

    if (task.description) {
        const description = document.createElement("p");
        description.textContent = task.description;
        card.append(description);
    }

    const actions = document.createElement("div");
    actions.className = "card-actions";

    actions.append(
        createActionButton("Edit", "edit-btn", "edit", task.id),
        createActionButton("Delete", "delete-btn", "delete", task.id)
    );

    card.append(actions);

    card.addEventListener("dragstart", (event) => {
        draggedTaskId = task.id;
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", task.id);

        requestAnimationFrame(() => {
            card.classList.add("dragging");
        });
    });

    card.addEventListener("dragend", () => {
        draggedTaskId = null;
        card.classList.remove("dragging");

        document.querySelectorAll(".column").forEach((column) => {
            column.classList.remove("drag-over");
        });
    });

    return card;
}

function renderTasks() {
    statuses.forEach((status) => {
        const list = document.querySelector(`#${status}-list`);
        const columnTasks = tasks.filter((task) => task.status === status);

        list.replaceChildren();

        if(columnTasks.length === 0) {
            const empty = document.createElement("p");
            empty.className = "empty-state";
            empty.textContent = "No tasks here yet";
            list.append(empty);
        } else {
            columnTasks.forEach((task) => {
                list.append(createTaskCard(task));
            });
        }

        document.querySelector(`#${status}-count`).textContent = columnTasks.length;
    });

    const count = tasks.length;
    taskSummary.textContent = `${count} ${count === 1 ? "task": "tasks"} on your board`;
}

function openTaskDialog(task = null) {
    form.reset();

    editingTaskId = task ? task.id : null;
    dialogTitle.textContent = task ? "Edit Task" : "Add a task";

    if (task) {
        titleInput.value = task.title;
        descriptionInput.value = task.description;
        statusInput.value = task.status;
    } else {
        statusInput.value = "todo";
    }

    dialog.showModal();
    titleInput.focus();
}

document.querySelector("#open-task-modal").addEventListener("click", () => {
    openTaskDialog();
});

document.querySelector("close-task-modal").addEventListener("click", () => {
    dialog.close();
});

document.querySelector("#cancel-task").addEventListener("click", () => {
    dialog.close();
});

dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        dialog.close();
    }
});

dialog.addEventListener("close", () => {
    editingTaskId = null;
})