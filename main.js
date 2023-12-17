let due_date = document.getElementById("due_date");
let task = document.getElementById("task");
let ground = document.getElementById("ground");
let edit_btn = document.getElementById("edit");
let save_btn = document.getElementById("save");
let cancel_btn = document.getElementById("cancel");
let todo = {
  Task: [],
  "Due-Date": [],
};
// Load data from localStorage on page load
if (localStorage.getItem("Task")) {
  todo["Task"] = JSON.parse(localStorage.getItem("Task"));
}
if (localStorage.getItem("Due-Date")) {
  todo["Due-Date"] = JSON.parse(localStorage.getItem("Due-Date"));
}
// Function to save data to localStorage
function saveToLocalStorage() {
  localStorage.setItem("Task", JSON.stringify(todo["Task"]));
  localStorage.setItem("Due-Date", JSON.stringify(todo["Due-Date"]));
}
function show() {
  ground.innerHTML = "";
  if (todo["Task"].length != 0) {
    for (let i = 0; i < todo["Task"].length; i++) {
      ground.innerHTML += `<div class="task_row">
                              <p>${todo["Task"][i]}</p> <p> ${todo["Due-Date"][i]} </p>
                                <button class = "edit" onclick="editTask(${i})">edit</button>
                                <button onclick="deleteTask(${i})">delete</button>
                          </div>`;
    }
  } else {
    ground.innerHTML = `<h1>Nothing found</h1>`;
  }
}

function deleteTask(index) {
  todo["Task"].splice(index, 1);
  todo["Due-Date"].splice(index, 1);
  saveToLocalStorage();
  show();
  task.value = "";
  due_date.value = "";
  edit_btn.style.display = "none";
  save_btn.style.display = "block";
}
let check_fun;
function editTask(index) {
  task.value = todo["Task"][index];
  due_date.value = todo["Due-Date"][index];
  edit_btn.style.display = "block";
  save_btn.style.display = "none";
  cancel_btn.style.display = "block";
  check();
}
let find_task_index;
let find_date_index;
function check() {
  for (let i = 0; i < todo["Task"].length; i++) {
    if (todo["Task"][i] === task.value) {
      find_task_index = [i];
    }
  }
  for (let i = 0; i < todo["Due-Date"].length; i++) {
    if (todo["Due-Date"][i] === due_date.value) {
      find_date_index = [i];
    }
  }
}
document.getElementById("edit").addEventListener("click", () => {
  todo["Task"][find_task_index] = task.value;
  todo["Due-Date"][find_date_index] = due_date.value;
  saveToLocalStorage();
  show();
});
document.getElementById("cancel").addEventListener("click", () => {
  task.value = "";
  due_date.value = "";
  edit_btn.style.display = "none";
  cancel_btn.style.display = "none";
  save_btn.style.display = "block";
});
document.getElementById("save").addEventListener("click", () => {
  let userTask = task.value;
  let userDueDate = due_date.value;
  if (userTask != "" && userDueDate != "") {
    todo["Task"].push(userTask);
    todo["Due-Date"].push(userDueDate);
    saveToLocalStorage();
    show();
    task.value = "";
    due_date.value = "";
  } else {
    alert("please fill up both fields!");
  }
});
// Display tasks from localStorage on page load
show();