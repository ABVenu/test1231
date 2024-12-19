const baseURL = "http://localhost:3000/todos";

// Selectors
const addTodoBtn = document.getElementById("add-todo-btn");
const todoModal = document.getElementById("todo-modal");
const closeModal = document.getElementById("close-modal");
const todoForm = document.getElementById("todo-form");
const todoContainer = document.getElementById("todo-container");
const modalTitle = document.getElementById("modal-title");
const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const todoIdInput = document.getElementById("todo-id");

// State
let todos = [];

// Utility Functions
const fetchTodos = async () => {
  try {
    const response = await fetch(baseURL);
    todos = await response.json();
    renderTodos();
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

const addOrUpdateTodo = async (todo) => {
  const method = todo.id ? "PUT" : "POST";
  const url = todo.id ? `${baseURL}/${todo.id}` : baseURL;

  try {
    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    fetchTodos();
  } catch (error) {
    console.error("Error saving todo:", error);
  }
};

const deleteTodo = async (id) => {
  try {
    await fetch(`${baseURL}/${id}`, {
      method: "DELETE",
    });
    fetchTodos();
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};

const markAsCompleted = async (id) => {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.status = true;
    addOrUpdateTodo(todo);
  }
};

// Event Handlers
const openModal = (todo = null) => {
  modalTitle.textContent = todo ? "Update Todo" : "Add Todo";
  taskInput.value = todo?.task || "";
  priorityInput.value = todo?.priority || "medium";
  deadlineInput.value = todo?.deadline || "";
  todoIdInput.value = todo?.id || "";
  todoModal.style.display = "flex";
};

const closeModalHandler = () => {
  todoModal.style.display = "none";
};

const submitTodoHandler = (e) => {
  e.preventDefault();
  const todo = {
    task: taskInput.value,
    priority: priorityInput.value,
    deadline: deadlineInput.value,
    status: false,
  };

  if (todoIdInput.value) {
    todo.id = parseInt(todoIdInput.value, 10);
  }

  addOrUpdateTodo(todo);
  closeModalHandler();
};

const renderTodos = () => {
  todoContainer.innerHTML = "";
  todos.forEach((todo) => {
    const card = document.createElement("div");
    card.className = "todo-card";
    if (!todo.status && new Date(todo.deadline) < new Date()) {
      card.classList.add("blinking-border");
    }

    card.innerHTML = `
      <h3>${todo.task}</h3>
      <p>Priority: ${todo.priority}</p>
      <p>Deadline: ${todo.deadline}</p>
      <p>Status: ${todo.status ? "Completed" : "Pending"}</p>
      <button onclick="markAsCompleted(${todo.id})">Mark as Completed</button>
      <button onclick="openModal(${JSON.stringify(todo).replace(/"/g, '&quot;')})">Update Task</button>
      <button onclick="deleteTodo(${todo.id})">Delete</button>
    `;

    todoContainer.appendChild(card);
  });
};

// Event Listeners
addTodoBtn.addEventListener("click", () => openModal());
closeModal.addEventListener("click", closeModalHandler);
todoForm.addEventListener("submit", submitTodoHandler);

// Initial Fetch
fetchTodos();
