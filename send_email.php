<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if the request method is POST, meaning the form has been submitted
    
    // Retrieve form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    
    // Set the recipient email address
    $to = "sameermadake121@gmail.com";
    
    // Set the email subject
    $subject = "New Contact Form Submission";
    
    // Construct the email body
    $body = "Name: $name\nEmail: $email\n\n$message";
    
    // Send the email using the mail() function
    if (mail($to, $subject, $body)) {
        // If the email is sent successfully, display a success message
        echo "Thank you! Your message has been sent.";
    } else {
        // If there's an error sending the email, display an error message
        echo "Oops! Something went wrong. Please try again later.";
    }
} else {
    // If the request method is not POST, display an error message
    echo "Error: Invalid request.";
}

