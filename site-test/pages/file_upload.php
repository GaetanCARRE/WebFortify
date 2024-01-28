<?php
$html = "";

$allowed_extensions = array('jpg', 'jpeg', 'png', 'pdf'); // Liste des extensions autorisées \n  function get_file_extension($filename) \n{\nreturn pathinfo($filename, PATHINFO_EXTENSION);\n}\nfunction is_valid_extension($filename, $allowed_extensions)\n{\n$file_extension = get_file_extension($filename);\nreturn in_array($file_extension, $allowed_extensions);\n}

// function get_file_extension($filename)
// {
//     return pathinfo($filename, PATHINFO_EXTENSION);
// }

// function is_valid_extension($filename, $allowed_extensions)
// {
//     $file_extension = get_file_extension($filename);
//     return in_array($file_extension, $allowed_extensions);
// }

if (isset($_POST['Upload'])) {
    // Where are we going to be writing to?
    if (isset($_FILES['uploaded'])) {
        $target_path = "../public/uploads/";
        $target_path .= basename($_FILES['uploaded']['name']);
        // Can we move the file to the upload folder?
        if (!move_uploaded_file($_FILES['uploaded']['tmp_name'], $target_path)) {
            $html .= '<pre>Your image was not uploaded.</pre>';
        } else {
            // Yes!
            $html .= "<pre>{$target_path} succesfully uploaded!</pre>";
        }
    } else {
        $html .= '<pre>Hello</pre>';
    }
}
?>

<!DOCTYPE html>
<html>

    <head>

        <title>File Upload Page </title>

    </head>

    <body>
        <div style="display: flex;justify-content: center;align-items: center; flex-direction: column;">

            <img src="../img/logo.png" alt="Test Image" height="200" width="300">
            <header>
                <button onclick="window.location.href = 'home.php';">Home</button>
                <button onclick="window.location.href = 'brute-force.php';">Brute Force</button>
                <button onclick="window.location.href = 'xss.php';">XSS</button>
                <button onclick="window.location.href = 'sql-injection.php';">SQL Injection</button>
            </header>
            <h1 style="font-size: xxx-large;">File Upload Page</h1>
            <form enctype="multipart/form-data" action="file_upload.php" method="POST"
                style="border : solid 2px; padding : 15px">
                <input type="hidden" name="MAX_FILE_SIZE" value="100000">
                Choose an image to upload:<br><br>
                <input name="uploaded" type="file"><br>
                <br>
                <input type="submit" name="Upload" value="Upload" />

            </form>
            <?php echo $html; ?>
        </div>
    </body>

</html>