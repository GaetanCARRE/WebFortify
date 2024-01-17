<?php
// Inclure le fichier de configuration
require_once('../back/config.php');
$html = "";
if (isset($_REQUEST['Submit'])) {
    // Get input
    $id = $_REQUEST['user_id'];

    // Check database

    global $conn;

    $query = "SELECT first_name, last_name FROM user WHERE id = '$id';";
    $result = mysqli_query($conn, $query);

    if ($result) {
        // Traitement des résultats
        while ($row = mysqli_fetch_assoc($result)) {
            $first_name = $row['first_name'];
            $last_name = $row['last_name'];

            $html .= "<pre>First Name: {$first_name}<br /><br />Last Name: {$last_name}</pre>";
        }

        // Libérer la mémoire du résultat
        mysqli_free_result($result);
    } else {
        // Gérer les erreurs de requête
        echo "Erreur de requête : " . mysqli_error($conn);
    }

    mysqli_close($conn);
}

?>

<!DOCTYPE html>
<html>

    <head>
        <title>XSS Page </title>
    </head>

    <body>
        <div style="display: flex;justify-content: center;align-items: center; flex-direction: column;">

            <img src="../img/logo.png" alt="Test Image" height="200" width="300">
            <header>
                <button onclick="window.location.href = 'home.php';">Home</button>
                <button onclick="window.location.href = 'brute-force.php';">Brute Force</button>
                <button onclick="window.location.href = 'xss.php';">XSS</button>
            </header>
            <h1 style="font-size: xxx-large;">Injection SQL Page</h1>
            <form method="get" action="sql-injection.php">
                <label for="title">User ID:</label>
                <input type="text" id="user_id" name="user_id" required><br><br>

                <input type="submit" value="Submit" name="Submit">
            </form>
            <?php echo $html; ?>
        </div>
    </body>

</html>