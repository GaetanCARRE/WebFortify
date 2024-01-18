<?php
$html = "";
// Is there any input?

if (isset($_GET['Login'])) {

    $user = $_GET[ 'username' ];

    // Get password
    $pass = $_GET[ 'password' ];

    $jsonData = file_get_contents('../db/bruteforce.json');
    $data = json_decode($jsonData, true);

    foreach ($data as $key => $value) {
        if ($value['username'] == $user && $value['password'] == $pass) {
            // Redirect to welcome.php
            header("Location: connected.php");
            exit;
        } else {
            $html = "<pre>Wrong username or password!</pre>";
        }
    }
}

?>

<!DOCTYPE html>
<html>

    <head>
        <title>Brute Force Page </title>
    </head>

    <body>
        <div style="display: flex;justify-content: center;align-items: center; flex-direction: column;">
            <img src="../img/logo.png" alt="Test Image" height="200" width="300">
            <header>
                <button onclick="window.location.href = 'home.php';">Home</button>
                <button onclick="window.location.href = 'sql-injection.php';">SQL Injection</button>
                <button onclick="window.location.href = 'xss.php';">XSS</button>
            </header>
            <h1 style="font-size: xxx-large;">Brute Force Page</h1>
            <form method="get" action="brute-force.php">
                Username:<br>
                <input type="text" name="username"><br>
                Password:<br>
                <input type="password" autocomplete="off" name="password"><br>
                <br>
                <input type="submit" value="Login" name="Login">
            </form>
            <?php echo $html; ?>
        </div>
    </body>

</html>