
<?php
header ("X-XSS-Protection: 0");

$html = "";
// Is there any input?*

if( isset( $_GET[ 'title' ])  && isset( $_GET[ 'content' ] ) ) {
    // Get input    
    $title = $_GET['title'];
    $content = $_GET['content'];

    // Check for HTML tags and remove them
    $title = strip_tags($title);
    $content = strip_tags($content);
 
    // Feedback for end user
    $html .= "<pre>Your comment has been posted!</pre>";
    
    // Display feedback
    $html .= "<pre>Title: {$title}</pre>";
    $html .= "<pre>Content: {$content}</pre>";
}

?>

<!DOCTYPE html>
<html>
<head>

    <title>XSS Page </title>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
<meta charset='UTF-8'>
<meta http-equiv='Content-Security-Policy' content="default-src 'self'; script-src 'self';">
<link rel="stylesheet" type="text/css" href="xss_correction.css">

</head>
<body>
    <div class="main-div">
    <img src="../img/logo.png" alt="Test Image" height="200" width="300" >
    <header>
                <button onclick="window.location.href = 'home.php';">Home</button>
                <button onclick="window.location.href = 'brute-force.php';">Brute Force</button>
                <button onclick="window.location.href = 'sql-injection.php';">SQL Injection</button>
                <button onclick="window.location.href = 'file_upload.php';">File Upload</button>
            </header>
    <h1>XSS Page</h1> 
    <form method="get" action="correction_xss.php">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" required><br><br>
        
        <label for="content">Content:</label><br>
        <textarea id="content" name="content" rows="5" cols="40" required></textarea><br><br>
        
        <input type="submit" value="Submit">
    </form>
    <?php echo $html; ?>  <!-- Affiche le contenu de la variable $html -->
    </div>
</body>
</html>

