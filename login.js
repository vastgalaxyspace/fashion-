document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Get the username and password from the form
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Check if the username and password match
    if (username === "sameer" && password === "sameer") {
        // Store the user data in local storage
        localStorage.setItem("loggedInUser", username);
        
        // Redirect the user to admin.html
        window.location.href = "admin.html";
    } else {
        alert("Invalid username or password");
    }
});
