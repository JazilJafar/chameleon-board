const STORAGE_KEY = "chameleon-board-tasks";

const columns = ["todo", "progress", "done"];
const lists = Object.fromEntries(
    columns.map((col) => [col, document.getElementById(`list-${col}`)])
);
const counts = Object.fromEntries(
    columns.map((col) => [
        col,
        document.querySelector(`[data-column="${col}"] .count`),
    ])
);

const form = document.getElementById("taskForm");
const titleInput = document.getElementById("taskTitle");

function loadTasks() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

let tasks = loadTasks();

function createTaskElement(task) {
    const el = document.createElement("article");
    el.className = "board-task";
    el.dataset.id = task.id;

    el.innerHTML = `
        <h4>${task.title}</h4>
        <div class="task-actions">
            <span>${task.tag || ""}</span>
            <div>
                ${task.column !== "todo" ? '<button class="back"><</button>': ""}
                ${task.column !== "done" ? '<button class="forward">></button>': ""}
                <button class="delete">x</button>
            </div>
        </div>
    `;

    return el;
}

function render() {
    columns.forEach((col) => {
        lists[col].innerHTML = "";
    });

    tasks.forEach((task) => {
        lists[task.column].appendChild(createTaskElement(task));
    });

    columns.forEach((col) => {
        const num = tasks.filter((t) => t.column === col).length;
        counts[col].textContent = String(num).padStart(2, "0");
    });
}

function addTask(title) {
    tasks.push({
        id: `task-${Date.now()}`,
        title,
        tag: "",
        column: "todo",
    });

    saveTasks(tasks);
    render();
}

function moveTask(id, direction) {
    const order = ["todo", "progress", "done"];
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const index = order.indexOf(task.column);
    const nextIndex = direction === "forward" ? index + 1 : index - 1;

    if (nextIndex < 0 || nextIndex >= order.length) return;

    task.column = order[nextIndex];
    saveTasks(tasks);
    render();
}

function deleteTask(id) {
    tasks = tasks.filter((t) => t.id !== id);
    saveTasks(tasks);
    render();
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    if (!title) return;

    addTask(title);
    titleInput.value = "";
});

document.querySelectorAll(".card-list").forEach((list) => {
    list.addEventListener("click", (event) => {
        const card = event.target.closest(".board-task");
        if (!card) return;

        const button = event.target.closest("button");
        if (!button) return;

        const id = card.dataset.id;
        const action = button.dataset.action;

        if(action === "delete") deleteTask(id);
        if(action === "forward") moveTask(id, "forward");
        if(action === "back") moveTask(id, "back");
    });
});

render();