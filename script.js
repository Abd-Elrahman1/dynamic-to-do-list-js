// Function to load tasks from Local Storage
function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  storedTasks.forEach((taskText) => addTask(taskText, false));
}

// Function to add a task
function addTask(taskText = null, save = true) {
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  if (taskText === null) {
    taskText = taskInput.value.trim();
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }
  }

  const li = document.createElement("li");
  li.textContent = taskText;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.classList.add("remove-btn");

  removeButton.onclick = () => {
    taskList.removeChild(li);
    removeTaskFromStorage(taskText);
  };

  li.appendChild(removeButton);
  taskList.appendChild(li);

  if (save) {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
  }

  taskInput.value = "";
}

// Function to remove a task from Local Storage
function removeTaskFromStorage(taskText) {
  let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  storedTasks = storedTasks.filter((task) => task !== taskText);
  localStorage.setItem("tasks", JSON.stringify(storedTasks));
}

// Wait for DOM content to load
document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");

  addButton.addEventListener("click", () => addTask());
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Call loadTasks() on page load
  loadTasks();
});
