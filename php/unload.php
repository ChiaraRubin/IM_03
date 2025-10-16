<?php
require_once 'config.php';
header('Content-Type: application/json;charset=utf-8');

try {
   $pdo = new PDO($dsn, $username, $password, $options);
   
   // Parameter auslesen
   $startdatum = isset($_GET["start"]) ? $_GET["start"] : false;
   $enddatum = isset($_GET["ende"]) ? $_GET["ende"] : false;

   // SQL-Query vorbereiten
   if ($enddatum && $startdatum) {
      $sql = "SELECT * FROM `Aare_Daten` 
              WHERE DATE(Zeit) >= :startdatum 
              AND DATE(Zeit) <= :enddatum
              ORDER BY Zeit";
      
      $stmt = $pdo->prepare($sql);
      $stmt->execute([
         ':startdatum' => $startdatum,
         ':enddatum' => $enddatum
      ]);
   } else {
      $sql = "SELECT * FROM `Aare_Daten` ORDER BY Zeit";
      $stmt = $pdo->prepare($sql);
      $stmt->execute();
   }

   $data = $stmt->fetchAll();

   if (empty($data)) {
      http_response_code(404);
      echo json_encode(['message' => 'Keine Daten gefunden']);
   } else {
      http_response_code(200);
      echo json_encode($data);
   }
   
} catch (PDOException $e) {
   http_response_code(500);
   echo json_encode(['error' => 'Datenbankfehler aufgetreten']);
}