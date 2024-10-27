<?php
session_start();
include '../database/db_connect.php';

$message = "";
$toastClass = "";

// Handle OTP verification
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $inputOtp = isset($_POST['otp']) ? $_POST['otp'] : '';

    // Check if the OTP is correct
    if ($inputOtp == $_SESSION['otp']) {
        // OTP is correct; proceed with registration
        $username = $_SESSION['username']; // Retrieve username from session
        $email = $_SESSION['email']; // Retrieve email from session
        $hashedPassword = password_hash($_SESSION['password'], PASSWORD_DEFAULT); // Hash the password

        // Insert user into the database
        $insertStmt = $conn->prepare("INSERT INTO userdata (username, email, password, type) VALUES (?, ?, ?, ?)");
        $insertStmt->bind_param("ssss", $username, $email, $hashedPassword, $_SESSION['type']);

        if ($insertStmt->execute()) {
            $message = "Registration successful!";
            $toastClass = "#28a745"; // Success color
            // Clear session data after successful registration
            unset($_SESSION['otp'], $_SESSION['email'], $_SESSION['username'], $_SESSION['password'], $_SESSION['type']);
        } else {
            $message = "Error during registration.";
            $toastClass = "#dc3545"; // Danger color
        }

        $insertStmt->close();
    } else {
        // OTP is incorrect
        $message = "Invalid OTP. Please try again.";
        $toastClass = "#dc3545"; // Danger color
        // Clear OTP for next attempt
        unset($_SESSION['otp']);
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <title>Verify OTP</title>
</head>
<body>
    <div class="container mt-5">
        <?php if ($message): ?>
            <div class="alert" style="background-color: <?php echo $toastClass; ?>; color: white;">
                <?php echo $message; ?>
            </div>
        <?php endif; ?>

        <form method="post" action="">
            <div class="mb-2 mt-2">
                <label for="otp"><i class="fa fa-lock"></i> Enter OTP</label>
                <input type="text" name="otp" id="otp" class="form-control" required>
            </div>
            <div class="mb-2 mt-3">
                <button type="submit" class="btn btn-success bg-success" style="font-weight: 600;">Verify OTP</button>
            </div>
        </form>

        <form method="post" action="register.php">
            <div class="mb-2 mt-3">
                <button type="submit" class="btn btn-secondary" style="font-weight: 600;">Back to Registration</button>
            </div>
        </form>
    </div>
</body>
</html>
