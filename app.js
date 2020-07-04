// UI vars
const taskInput = document.querySelector("#task-input"),
  addTaskBtn = document.querySelector("#add-task"),
  filter = document.querySelector("#filter"),
  items = document.querySelector(".items");

// DOM load event
document.addEventListener("DOMContentLoaded", function () {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    // Create LI
    const lis = document.createElement("li");
    lis.className = "lis";
    // create text node and append to li
    lis.appendChild(document.createTextNode(task));
    lis.innerHTML += `<i id="dlt-icon" class="fas fa-trash-alt"></i>`;
    // append li to ul
    items.appendChild(lis);
  });
});

// Adding task to UI
addTaskBtn.addEventListener("click", function (e) {
  if (taskInput.value === "") {
    // Create div element
    const errorDiv = document.createElement("div");
    // Add class
    errorDiv.className = "errorMsg";
    // create text node and append
    errorDiv.appendChild(
      document.createTextNode("कृपया गर्नुपर्ने काम टाइप गर्नुहोस्")
    );
    document.querySelector(".container").insertBefore(errorDiv, taskInput);
    setTimeout(function () {
      document.querySelector(".errorMsg").remove();
    }, 4000);
  } else {
    // Create LI
    const lis = document.createElement("li");
    lis.className = "lis";
    // create text node and append to li
    lis.appendChild(document.createTextNode(taskInput.value));
    lis.innerHTML += `<i id="dlt-icon" class="fas fa-trash-alt"></i>`;
    // append li to ul
    items.appendChild(lis);
    // adding class having animation
    lis.classList.add("animated-show");
    // Add to local storage
    addToLocalStorage(taskInput.value);
    // Clear input value
    taskInput.value = "";
  }
});

// Add to Local Storage
function addToLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Filter Task
filter.addEventListener("keyup", function (e) {
  const text = e.target.value;
  document.querySelectorAll(".lis").forEach(function (task) {
    const item = task.textContent;
    if (item.indexOf(text) !== -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
});

// Delete Task
items.addEventListener("click", function (e) {
  if (e.target.classList.contains("fas")) {
    // adding class having animation
    e.target.parentElement.classList.add("animated-hide");
    // Removing task from UI after animation is over
    setTimeout(function () {
      e.target.parentElement.remove();
    }, 500);
    removeFromLocalStorage(e.target.parentElement);
  }
});

// Remove from Local Storage
function removeFromLocalStorage(removeTask) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task, index) {
    if (removeTask.firstChild.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
