<?php

// Transformations-Skript als 'transform.php' einbinden
include('transform.php');

// Bindet die Datenbank-Konfiguration ein 
require_once('config.php');

try {
    // Erstellt eine neue PDO-Instanz mit der Konfiguration aus config.php
    $pdo = new PDO($dsn, $username, $password, $options);

    // SQL-Query mit Platzhaltern (:____) für sicheres Einfügen von Daten
    $sql = "INSERT INTO `Aare_Daten` 
        (`Lufttemperatur`, `Wassertemperatur`, `Wassermenge`, `Zeit`) 
        VALUES (:Lufttemperatur, :Wassertemperatur, :Wassermenge, :Zeit)";

   // Bereitet die SQL-Anweisung vor
   $stmt = $pdo->prepare($sql);

   // Führt das Statement aus und bindet die Werte an die Platzhalter
    $stmt->execute([
    ':Lufttemperatur'   => $transformedData['tt'],  // Lufttemperatur
    ':Wassertemperatur' => $transformedData['temperature'],           // Wassertemperatur
    ':Wassermenge'      => $transformedData['flow'],         // Wassermenge
    ':Zeit'             => date('Y-m-d H:i:s')               // aktueller Zeitstempel
    ]);

    echo "Daten erfolgreich eingefügt.";
    
} catch (PDOException $e) {
     // Fängt Datenbankfehler ab und gibt eine Fehlermeldung aus
    die("Fehler beim Einfügen in die Datenbank: " . $e->getMessage());
}
?>
