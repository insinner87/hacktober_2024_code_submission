<?php
// Database credentials
$servername = "localhost";
$username = "root";      // Update if different
$password = "";          // Update if different
$dbname = "contact_form_db";

// Connect to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Insert data into messages table
    $stmt = $conn->prepare("INSERT INTO messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $email, $phone, $subject, $message);

    if ($stmt->execute()) {
        echo "<p style='color: green;'>Thank you, $name! Your message has been received.</p>";
    } else {
        echo "<p style='color: red;'>Error: Could not save your message. Please try again later.</p>";
    }

    $stmt->close();
    $conn->close();
}
?>
