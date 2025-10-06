<?php
require_once 'config.php';

try {
    //Erstellt eine neue PDO Verbindung
    // WIchtig immer PDO verwenden
    $pdo = new PDO($dsn, $username, $password, $options);

    $sql = "SELECT * FROM `User`";
    $stmt = $pdo->query($sql);
    $users = $stmt->fetchAll();

foreach($users as $user) {
   echo "ID: " . $user['id'] . " Name: "  . $user['firstname'] . "<br>";

}

} catch (PDOException $e) {
    //Behandelt Verbindungsfehler
    die("Datenverbindungsfehler: ". $e->getMessage());
}