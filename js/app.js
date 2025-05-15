import { Task } from "./class.js";

function LoadTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function SaveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function RenderTasks() {
  const list = document.getElementById("TaskList");
  list.innerHTML = "";

  const tasks = LoadTasks();

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    
    if (task.completed) {
      li.classList.add("completed");
    }
    
    li.textContent = `${task.title}: ${task.description}`;
    
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "×";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function(e) { 
      e.stopPropagation();
      DeleteTask(index); 
    };
    
    li.onclick = function() {
      ToggleTaskComplete(index);
    };
    
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

function AddTask() {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  if (title === "" || description === "") {
    alert("Preencha todos os campos.");
    return;
  }

  const newTask = new Task(title, description);
  const tasks = LoadTasks();

  tasks.push(newTask);
  SaveTasks(tasks);

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";

  RenderTasks();
}

function DeleteTask(index) {
  const tasks = LoadTasks();
  tasks.splice(index, 1);
  SaveTasks(tasks);
  RenderTasks();
}

function ToggleTaskComplete(index) {
  const tasks = LoadTasks();
  tasks[index].completed = !tasks[index].completed;
  SaveTasks(tasks);
  RenderTasks();
}

window.onload = RenderTasks;
window.AddTask = AddTask;
window.DeleteTask = DeleteTask;
window.ToggleTaskComplete = ToggleTaskComplete;