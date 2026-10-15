//find elements
const taskList = document.getElementById("tasks");
const editTaskDialog = document.getElementById("edit-task-dialog");
const editTitle = document.getElementById("edit-title");
const editDescription = document.getElementById("edit-description");
const editDuration = document.getElementById("edit-duration");
const editDueDate = document.getElementById("edit-due-date");
const editError = document.getElementById("edit-error");
const editTaskForm = document.getElementById("edit-task-form");

let editingTaskId = null;

//load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//draw all tasks
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");

        li.addEventListener("click", () => {
            editingTaskId = task.id;
            editTitle.value = task.title;
            editDescription.value = task.description;
            editDuration.value = task.duration;
            editDueDate.value = task.dueDate;
            editError.textContent = "";
            editTaskDialog.showModal();
        });

        const title =document.createElement("h3");
        title.textContent =task.title;

        const description = document.createElement ("p");
        description.textContent =task.description;
        
        const details = document.createElement("p");
        details.textContent = `${task.duration} min - Due ${task.dueDate}`;

        //complete button
        
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "✓";
        completeBtn.classList.add("complete-btn");

        completeBtn.addEventListener("click", () => {
            event.stopPropagation(); 
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
    });

    if (task.completed) {
        li.classList.add("completed");
    }

    //delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
        event.stopPropagation(); 
        tasks = tasks.filter((t) => t.id !== task.id);
        saveTasks();
        renderTasks();
        showToast("Task deleted!");

    });

        li.append(title,description, details, completeBtn, deleteBtn);
        taskList.append(li);

    });
}

renderTasks();

//save edited task
editTaskForm.addEventListener("submit" , (event) => {
    event.preventDefault();

    const newTitle = editTitle.value.trim();

    if (newTitle.length < 3) {
        editError.textContent = "Title must be at least 3 characters long.";
        return;     
    }

    editError.textContent = "";

    const task = tasks.find((t) => t.id === editingTaskId);

    task.title =newTitle;
    task.description = editDescription.value.trim();
    task.duration = Number(editDuration.value);
    task.dueDate = editDueDate.value;

    saveTasks();
    renderTasks();

    editTaskDialog.close();
    showToast("Task updated!");
});