let In = document.querySelector("#input_task");
let btn = document.querySelector(`#add_task`);
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

window.onload = (_) => In.focus();

tasks.forEach((task) => {
  console.log(tasks);

  creatElement(task.title, task.id, task.statue);
});

btn.addEventListener("click", () => {
  if (In.value) {
    let newtask = {
      id: Date.now(),
      title: In.value,
      statue: "0",
    };
    tasks.push(newtask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    creatElement(In.value, newtask.id);
  }
});

function creatElement(text, id, state = null) {
  let ticket = document.createElement("div");
  ticket.classList.add("task_container");
  if (state == true) ticket.classList.add("done");

  ticket.innerHTML = `
<input type="checkbox"  id="state"${
    state == true ? "checked" : ""
  } onclick="changestate(this.parentElement)">
<p class="task_content" data-id="${id}"> ${text}</p>
<input type="button" value="Delete" id="delete_btn" onclick="erase(this.parentElement)">
`;

  document.querySelector(".tasks").appendChild(ticket);
}

function erase(x) {
  let id = x.children[1].dataset.id;
  tasks = tasks.filter((t) => t.id != id);
  localStorage.setItem("tasks", {});
  localStorage.setItem("tasks", JSON.stringify(tasks));
  x.remove();
}
function changestate(x) {
  x.classList.toggle("done");
  let state = x.children[0].checked;
  let input = x.children[1];
  let id = input.dataset.id;
  let newtask = {
    id: id,
    title: input.innerText,
    statue: state,
  };
  tasks = tasks.filter((t) => t.id != id);
  tasks.push(newtask);
  localStorage.setItem("tasks", {});
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
