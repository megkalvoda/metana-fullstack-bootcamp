const moodBtn = document.getElementById("mood-btn");
const moodDialog = document.getElementById("mood-dialog");

moodBtn.addEventListener("click", () => {
    moodDialog.showModal();
});