// Declare UI variables
const taskInput = document.querySelector("#task");
const filter = document.querySelector("#filter");
const form = document.querySelector("#task-form");
const clearBtn = document.querySelector(".clear-tasks");
const taskList = document.querySelector(".collection");

loadEventListeners();

// Create load event listeners function
function loadEventListeners() {
  // On load DOM content, get all the tasks to UL
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // Clear tasks event
  clearBtn.addEventListener("click", clearTasks);
  // filter tasks
  filter.addEventListener("keyup", filterTasks);
}

function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task, please");
  } else {
    // what do  i need now ? to create a task item
    // create a li element
    const li = document.createElement("li");

    // give a class name to the li
    li.className = "collection-item";

    // create a text node for li
    li.appendChild(document.createTextNode(taskInput.value));

    // create a new link element [X]
    const link = document.createElement("a");

    // Add class
    link.className = "delete-item secondary-content";

    // Add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append the link to LI
    li.appendChild(link);

    // Append the LI to the UL
    taskList.appendChild(li);

    // store task
    storeTask(taskInput.value);

    // clear input
    taskInput.value = "";
  }

  e.preventDefault();
}

// Remove task event
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove task from local storage function
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear tasks event
function clearTasks() {
  // first way to clear tasks
  // taskList.innerHTML = "";

  // second way to clear tasks
  if (confirm("Are you sure you want to clear all tasks? ")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
  clearTasksFromLocalStorage();
}

// Clear tasks from Local Storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const searchedItem = task.firstChild.textContent;

    if (searchedItem.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });

  // console.log(text);
}

// Store task function
function storeTask(task) {
  // create variable called tasks
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  // push task into tasks array
  tasks.push(task);

  // storing tasks in local storage under string format
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  // create variable called tasks
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    const li = document.createElement("li");

    // give a class name to the li
    li.className = "collection-item";

    // create a text node for li
    li.appendChild(document.createTextNode(task));

    // create a new link element [X]
    const link = document.createElement("a");

    // Add class
    link.className = "delete-item secondary-content";

    // Add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append the link to LI
    li.appendChild(link);

    // Append the LI to the UL
    taskList.appendChild(li);
  });
}
