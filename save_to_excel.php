<?php
// Database connection
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get and sanitize form data
$name = $conn->real_escape_string($_POST['name']);
$email = $conn->real_escape_string($_POST['email']);
$phone = $conn->real_escape_string($_POST['phone']);
$course = $conn->real_escape_string($_POST['course']);
$message = $conn->real_escape_string($_POST['message']);
$timestamp = date('Y-m-d H:i:s');

// SQL to insert data
$sql = "INSERT INTO contact_submissions (name, email, phone, course, message, timestamp)
        VALUES ('$name', '$email', '$phone', '$course', '$message', '$timestamp')";

if ($conn->query($sql) === TRUE) {
    $response = ['status' => 'success', 'message' => 'Thank you! Your submission has been saved.'];
} else {
    $response = ['status' => 'error', 'message' => 'Error: ' . $sql . '<br>' . $conn->error];
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($response);
?>