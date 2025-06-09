const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskSummary = document.getElementById("taskSummary");

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  
  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;
  taskSpan.style.cursor = "pointer";

  // Toggle completion
  taskSpan.addEventListener("click", () => {
    taskSpan.classList.toggle("completed");
    updateSummary();
  });

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => {
    taskList.removeChild(li);
    updateSummary();
  });

  li.appendChild(taskSpan);
  li.appendChild(removeBtn);
  taskList.appendChild(li);
  taskInput.value = "";

  updateSummary();
}

function updateSummary() {
  const total = taskList.children.length;
  const completed = taskList.querySelectorAll(".completed").length;
  taskSummary.textContent = `${completed} / ${total} tasks completed`;
}
