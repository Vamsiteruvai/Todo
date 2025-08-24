const todoInput = document.getElementById("TodoText");
const addBtn = document.getElementById("add");
const ul = document.querySelector("ul");
const counter = document.getElementById("counter");

function updateCounter() {
  counter.textContent = ul.querySelectorAll("li").length;
}
addBtn.addEventListener("click", () => {
    if (todoInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    // create new todo item
    const li = document.createElement("li");
    li.className =
        "text-sm flex justify-between bg-gray-800 p-2 rounded-md text-gray-200 mt-2";
    li.innerHTML = `
    <span>${todoInput.value}</span>
    <div>
      <i class="fa-solid fa-pen-to-square mx-1 cursor-pointer"></i>
      <i class="fa-solid fa-trash mx-1 cursor-pointer" style="color: #ee3211;"></i>
    </div>
  `;
    ul.appendChild(li);
    updateCounter();

    const editing = document.createElement("div");
    const input = document.createElement("input");
    const saveBtn = document.createElement("button");

    editing.className = "mt-1 flex hidden";
    input.className = "bg-gray-800 p-1 w-[100%] rounded-lg text-sm outline-none";
    input.placeholder = "Edit your todo";
    saveBtn.className =
        "text-sm p-1 bg-green-700 rounded-md text-gray-200 cursor-pointer ml-1";
    saveBtn.textContent = "Save";

    editing.appendChild(input);
    editing.appendChild(saveBtn);
    ul.appendChild(editing);

    todoInput.value = "";

    // get icons from this li
    const editIcon = li.querySelector(".fa-pen-to-square");
    const deleteIcon = li.querySelector(".fa-trash");
    const span = li.querySelector("span");

    // edit icon click
    editIcon.addEventListener("click", () => {
        input.value = span.textContent;
        editing.classList.toggle("hidden");
    });

    // save button click
    saveBtn.addEventListener("click", () => {
        if (input.value.trim() === "") {
            alert("Please enter text");
            return;
        }
        span.textContent = input.value; // update todo text
        editing.classList.add("hidden");
    });

    // delete icon click
    deleteIcon.addEventListener("click", () => {
        li.remove();
        updateCounter();
        editing.remove();
    });
});
