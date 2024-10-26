<?php
// Database credentials
$servername = "localhost"; // Change if needed
$username = "root";         // Update if different
$password = "";             // Update if different
$dbname = "contact_form_db"; // Your database name

// Connect to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Initialize variables to store form data
$name = $email = $phone = $subject = $message = "";

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form inputs
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $phone = htmlspecialchars(trim($_POST['phone']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Insert data into messages table
    $stmt = $conn->prepare("INSERT INTO messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $email, $phone, $subject, $message);

    if ($stmt->execute()) {
        // Redirect to the index page on successful submission
        header('Location: http://127.0.0.1:3000/main_page/indexx.html', true, 307);
        exit(); // Always call exit after a redirect
    } else {
        echo "<p style='color: red;'>Error: Could not save your message. Please try again later.</p>";
    }

    $stmt->close();
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Responsive Contact Us Form Using HTML and CSS</title>
    <link rel="stylesheet" href="styleContact.css">
</head>
<body>

<div class="wrapper">
  <div class="title">
    <h1>Contact Us</h1>
  </div>
  
  <!-- Form element with action pointing to itself -->
  <form action="" method="POST" class="contact-form">
    <div class="input-fields">
      <input type="text" name="name" class="input" placeholder="Name" required>
      <input type="email" name="email" class="input" placeholder="Email Address" required>
      <input type="tel" name="phone" class="input" placeholder="Phone">
      <input type="text" name="subject" class="input" placeholder="Subject">
    </div>
    
    <div class="msg">
      <textarea name="message" placeholder="Message" required></textarea>
      <button type="submit" class="btn">Send</button>
    </div>
  </form>

  <!-- Home button below the form -->
  <div class="home-button">
      <a href="http://127.0.0.1:3000/main_page/indexx.html" class="btn">Home</a> <!-- Ensure this URL is correct -->
  </div>
</div>

</body>
</html>
