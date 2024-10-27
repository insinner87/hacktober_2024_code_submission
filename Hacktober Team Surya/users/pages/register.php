<?php
session_start();
include '../database/db_connect.php';

$message = "";
$toastClass = "";

// Handle the registration and OTP sending
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['register'])) {
    $username = $_POST['username'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $type = $_POST['type'] ?? '';

    // Generate OTP
    $otp = rand(1000, 9999);
    $_SESSION['otp'] = $otp; // Store OTP in session
    $_SESSION['username'] = $username; // Store username
    $_SESSION['email'] = $email; // Store email
    $_SESSION['password'] = $password; // Store password
    $_SESSION['type'] = $type; // Store user type

    // Send OTP via Python script
    $command = escapeshellcmd("python index.py $email $otp");
    shell_exec($command); // Execute the command, but do not check output

    // Check if OTP has been sent
    $message = "OTP has been sent to your email. Please enter it below.";
    $toastClass = "#28a745"; // Success color
}

// Handle OTP verification
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['verify'])) {
    $inputOtp = $_POST['otp'] ?? '';

    // Check if the OTP is correct
    if ($inputOtp == $_SESSION['otp']) {
        // OTP is correct; proceed with registration
        $password = $_SESSION['password']; // Use the plain password

        // Insert user into the database without hashing
        $insertStmt = $conn->prepare("INSERT INTO userdata (username, email, password, type) VALUES (?, ?, ?, ?)");
        $insertStmt->bind_param("ssss", $_SESSION['username'], $_SESSION['email'], $password, $_SESSION['type']);

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
    <title>Register</title>
</head>
<body>
    <div class="container mt-5">
        <?php if ($message): ?>
            <div class="alert" style="background-color: <?php echo $toastClass; ?>; color: white;">
                <?php echo $message; ?>
            </div>
        <?php endif; ?>

        <!-- Registration Form -->
        <?php if (!isset($_SESSION['otp'])): ?>
            <form method="post" action="">
                <div class="mb-2">
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username" class="form-control" required>
                </div>
                <div class="mb-2">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" class="form-control" required>
                </div>
                <div class="mb-2">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" class="form-control" required>
                </div>
                <div class="mb-2">
                    <label for="type">Type</label>
                    <select name="type" id="type" class="form-control">
                        <option value="Customer">Customer</option>
                        <option value="Farmer">Farmer</option>
                    </select>
                </div>
                <div class="mb-2 mt-3">
                    <button type="submit" name="register" class="btn btn-success bg-success" style="font-weight: 600;">Register</button>
                </div>
                </div>
                <div class="mb-2 mt-4">
                    <p class="text-center" style="font-weight: 600; color: navy;"><a href="./login.php" style="text-decoration: none;">login to  Account</a> OR <a href="./resetpassword.php" style="text-decoration: none;">Forgot Password</a></p>
                </div>
            </form>
        <?php else: ?>
            <!-- OTP Verification Form -->
            <form method="post" action="">
                <div class="mb-2 mt-2">
                    <label for="otp"><i class="fa fa-lock"></i> Enter OTP</label>
                    <input type="text" name="otp" id="otp" class="form-control" required>
                </div>
                <div class="mb-2 mt-3">
                    <button type="submit" name="verify" class="btn btn-success bg-success" style="font-weight: 600;">Verify OTP</button>
                </div>
                
            </form>
        <?php endif; ?>
    </div>
</body>
</html>
