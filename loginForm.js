//find elements
const profileBtn = document.getElementById("profile-btn");
const usernameDisplay =document.getElementById("username");

const loginDialog = document.getElementById('login-dialog');
const loginForm = document.querySelector(".login-form");
const loginError = document.getElementById("login-error");

const profileDialog = document.getElementById("profile-dialog");
const profileForm = document.getElementById("profile-form");
const profileUsername = document.getElementById("profile-username");
const profilePassword = document.getElementById("profile-password");
const profileError = document.getElementById;("profile-error");

const logoutBtn = document.getElementById("logout-btn");

// on page load show saved name
const savedUser = JSON.parse(localStorage.getItem("user"));

if (savedUser) {
    usernameDisplay.textContent = savedUser.username;
}

//profile button click event
profileBtn.addEventListener("click", () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (currentUser) {
        profileUsername.value = currentUser.username;
        profilePassword.value = currentUser.password;
        profileDialog.showModal();
    } else {
        loginDialog.showModal();
    }
});


//login form submission
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;

    if (username.length < 3) {
        loginError.textContent = "Username must be at least 3 characters long.";
        return;
    }

    if (password.length < 6) {
        loginError.textContent = "Password must be at least 6 characters long.";
        return;
    }
    loginError.textContent = "";

    const user = { username: username, password: password };
    localStorage.setItem("user", JSON.stringify(user));
   
    loginDialog.close();
    loginForm.reset();
    showToast("Login in successfully!");
    usernameDisplay.textContent = username;
});

// Profile form submission
profileForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = profileUsername.value.trim();
    const password = profilePassword.value;

    if (username.length < 3) {
        profileError.textContent = "Username must be at least 3 characters long.";
        return;
    }

    if (password.length < 6) {
        profileError.textContent = "Password must be at least 6 characters long.";
        return;
    }
    profileError.textContent = "";

    const updatedUser = { username: newUsername, password: newPassword };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    profileDialog.close();
    showToast("Profile updated!");
    usernameDisplay.textContent = newUsername;
});

//logout button click event
logoutBtn.addEventListener("click",() => {
    localStorage.removeItem("user");
    profileDialog.close();
    usernameDisplay.textcontent = "Guest";
    showToast("Logged out successfully!");
    loginDialog.showModal();
});





