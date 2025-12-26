<?php
// Bindet die Datenbank-Konfiguration ein
require_once 'config.php';

try {
    //Erstellt eine neue PDO Verbindung
    // Wichtig immer PDO verwenden
    $pdo = new PDO($dsn, $username, $password, $options);

    // SQL-Query: Alle Einträge aus der Tabelle 'User' auswählen
    $sql = "SELECT * FROM `User`";
    // Führt die Query aus
    $stmt = $pdo->query($sql);
    // Holt alle Ergebnisse als Array
    $users = $stmt->fetchAll();

    // Durchläuft jeden User und gibt ID und Vorname aus
    foreach($users as $user) {
        echo "ID: " . $user['id'] . " Name: "  . $user['firstname'] . "<br>";
    }

} catch (PDOException $e) {
    //Behandelt Verbindungsfehler und gibt Fehlermeldung aus
    die("Datenverbindungsfehler: ". $e->getMessage());
}
?>