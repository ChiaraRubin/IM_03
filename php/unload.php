<?php
// Bindet die Datenbank-Konfiguration ein
require_once 'config.php';

// Setzt den Response-Header auf JSON mit UTF-8 Encoding
header('Content-Type: application/json;charset=utf-8');

try {
   // Erstellt eine neue PDO-Verbindung zur Datenbank
   $pdo = new PDO($dsn, $username, $password, $options);
   
   // Liest die URL-Parameter start und ende aus 
   // Falls nicht vorhanden, wird false als Standardwert gesetzt
   $startdatum = isset($_GET["start"]) ? $_GET["start"] : false;
   $enddatum = isset($_GET["ende"]) ? $_GET["ende"] : false;

   // SQL-Query wird vorbereitet
   if ($enddatum && $startdatum) {
      // Filtert Daten nach dem angegebenen Zeitraum
      // DATE (Zeit) extrahiert nur das Datum für den Vergleich
      $sql = "SELECT * FROM `Aare_Daten` 
              WHERE DATE(Zeit) >= :startdatum 
              AND DATE(Zeit) <= :enddatum
              ORDER BY Zeit";
      
      // Prepared Statement wird erstellt und mit den Parametern ausgeführt
      $stmt = $pdo->prepare($sql);
      $stmt->execute([
         ':startdatum' => $startdatum,
         ':enddatum' => $enddatum
      ]);
   } else {
      // Falls kein Zeitraum angegeben wird, so werden alle Daten abgerufen
      $sql = "SELECT * FROM `Aare_Daten` ORDER BY Zeit";
      $stmt = $pdo->prepare($sql);
      $stmt->execute();
   }

   // Alle gefundenen Datensätze werden als Array abgerufen
   $data = $stmt->fetchAll();

   // Überprüft, ob Daten gefunden wurden
   if (empty($data)) {
      http_response_code(404);
      echo json_encode(['message' => 'Keine Daten gefunden']);
   } else {
      http_response_code(200);
      echo json_encode($data);
   }
   
} catch (PDOException $e) {
   // Bei Datenbankfehlern wird der Statuscode 500 (Server Error) gesetzt
   http_response_code(500);
   // Eine Fehlermeldung wird zurückgegeben 
   echo json_encode(['error' => 'Datenbankfehler aufgetreten']);
}
?>