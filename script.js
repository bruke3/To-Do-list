// 1. Grab the elements we need
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const counter = document.querySelector("#counter");

// 2. Our data: an array of task objects
let tasks = [];

// 3. Add a task when the form is submitted
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading
  const text = input.value.trim();
  if (text === "") return;

  tasks.push({ id: Date.now(), text: text, done: false });
  input.value = "";
  render();
});

// 4. Toggle done / not done
function toggleTask(id) {
  tasks = tasks.map(function (task) {
    return task.id === id ? { ...task, done: !task.done } : task;
  });
  render();
}

// 5. Delete a task
function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  render();
}

// 6. Draw the whole list on the page from the data
function render() {
  list.innerHTML = "";

  tasks.forEach(function (task) {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const span = document.createElement("span");
    span.textContent = task.text;
    span.addEventListener("click", function () {
      toggleTask(task.id);
    });

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.className = "delete-btn";
    del.addEventListener("click", function () {
      deleteTask(task.id);
    });

    li.append(span, del);
    list.appendChild(li);
  });

  const left = tasks.filter(function (task) {
    return !task.done;
  }).length;
  counter.textContent = left + (left === 1 ? " task left" : " tasks left");
}

// 7. Draw once on page load
render();