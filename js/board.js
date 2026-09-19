const STORAGE_KEY = "chameleon-board-tasks";

const columns = ["todo", "progress", "done"];

const lists = Object.fromEntries(
  columns.map((column) => [
    column,
    document.getElementById(`list-${column}`),
  ])
);

const counts = Object.fromEntries(
  columns.map((column) => [
    column,
    document.querySelector(`[data-column="${column}"] .count`),
  ])
);

const form = document.getElementById("taskForm");
const titleInput = document.getElementById("taskTitle");

function loadTasks() {
  const rawTasks = localStorage.getItem(STORAGE_KEY);

  if (!rawTasks) {
    return [];
  }

  try {
    return JSON.parse(rawTasks);
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

let tasks = loadTasks();

function createTaskElement(task) {
  const element = document.createElement("article");

  element.className = "board-task";
  element.dataset.id = task.id;

  element.innerHTML = `
    <h4>${escapeHTML(task.title)}</h4>

    <div class="task-actions">
      <span>${escapeHTML(task.tag || "")}</span>

      <div class="task-action-buttons">
        ${
          task.column !== "todo"
            ? '<button type="button" data-action="back" aria-label="Move task back">←</button>'
            : ""
        }

        ${
          task.column !== "done"
            ? '<button type="button" data-action="forward" aria-label="Move task forward">→</button>'
            : ""
        }

        <button type="button" data-action="delete" aria-label="Delete task">
          ✕
        </button>
      </div>
    </div>
  `;

  return element;
}

function render() {
  columns.forEach((column) => {
    lists[column].innerHTML = "";
  });

  tasks.forEach((task) => {
    if (!lists[task.column]) {
      task.column = "todo";
    }

    lists[task.column].appendChild(createTaskElement(task));
  });

  columns.forEach((column) => {
    const taskCount = tasks.filter(
      (task) => task.column === column
    ).length;

    counts[column].textContent = String(taskCount).padStart(2, "0");
  });

  saveTasks();
}

function addTask(title) {
  const newTask = {
    id: `task-${Date.now()}`,
    title,
    tag: "",
    column: "todo",
  };

  tasks.push(newTask);
  saveTasks();
  render();
}

function moveTask(id, direction) {
  const columnOrder = ["todo", "progress", "done"];
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return;
  }

  const currentIndex = columnOrder.indexOf(task.column);
  const nextIndex =
    direction === "forward"
      ? currentIndex + 1
      : currentIndex - 1;

  if (nextIndex < 0 || nextIndex >= columnOrder.length) {
    return;
  }

  task.column = columnOrder[nextIndex];

  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  saveTasks();
  render();
}

function escapeHTML(value) {
  const container = document.createElement("div");
  container.textContent = value;
  return container.innerHTML;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();

  if (!title) {
    return;
  }

  addTask(title);
  titleInput.value = "";
  titleInput.focus();
});

document.querySelectorAll(".card-list").forEach((list) => {
  list.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");

    if (!button) {
      return;
    }

    const card = event.target.closest(".board-task");

    if (!card) {
      return;
    }

    const taskId = card.dataset.id;
    const action = button.dataset.action;

    if (action === "delete") {
      deleteTask(taskId);
    }

    if (action === "forward") {
      moveTask(taskId, "forward");
    }

    if (action === "back") {
      moveTask(taskId, "back");
    }
  });
});

render();