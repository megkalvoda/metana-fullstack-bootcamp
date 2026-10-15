const addTaskBtn = document.getElementById("add-task-btn");
const taskDialog = document.getElementById("task-dialog");

addTaskBtn.addEventListener("click", () => {
    taskDialog.showModal();
});

const taskForm = document.getElementById("task-form");
const taskError = document.getElementById("task-error");

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("task-title").value.trim();
    const description = document.getElementById("task-description").value.trim();
    const dueDate = document.getElementById("due-date").value;
    const duration = Number(document.getElementById("task-duration").value);

    if (title.length < 3) {
        taskError.textContent = "Title must be at least 3 characters long.";
        return;
    }

    taskError.textContent ="";

    const newTask = {
        id: Date.now(),
        title: title,
        description: description,
        duration: duration,
        dueDate: dueDate,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    taskDialog.close();
    taskForm.reset();
    showToast("Task created!");
});
