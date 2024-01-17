<?php
// Informations de connexion à la base de données
$host = "localhost"; // L'hôte de la base de données (peut être "localhost" si vous utilisez une base de données en local)
$user = "root"; // Votre nom d'utilisateur MySQL
$pass = ""; // Votre mot de passe MySQL
$db   = "users"; // Le nom de votre base de données

// Établir la connexion
$conn = mysqli_connect($host, $user, $pass, $db);



// Vérifier la connexion
if (!$conn) {
    die("La connexion à la base de données a échoué : " . mysqli_connect_error());
}


