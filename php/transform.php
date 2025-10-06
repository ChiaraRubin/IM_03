<?php
try {
/* ============================================================================
   HANDLUNGSANWEISUNG (transform.php)
   0) Schau dir die Rohdaten genau an und plane exakt, wie du die Daten umwandeln möchtest (auf Papier)
   1) Binde extract.php ein und erhalte das Rohdaten-Array.
   2) Definiere Mapping Koordinaten → Anzeigename (z. B. Bern/Chur/Zürich).
   3) Konvertiere Einheiten (z. B. °F → °C) und runde sinnvoll (Celsius = (Fahrenheit - 32) * 5 / 9).
   4) Leite eine einfache "condition" ab (z. B. sonnig/teilweise bewölkt/bewölkt/regnerisch).
   5) Baue ein kompaktes, flaches Array je Standort mit den Ziel-Feldern.
   6) Optional: Sortiere die Werte (z. B. nach Zeit), entferne irrelevante Felder.
   7) Validiere Pflichtfelder (location, temperature_celsius, …).
   8) Kodieren: json_encode(..., JSON_PRETTY_PRINT) → JSON-String.
   9) GIB den JSON-String ZURÜCK (return), nicht ausgeben – für den Load-Schritt.
  10) Fehlerfälle als Exception nach oben weiterreichen (kein HTML/echo).
   ============================================================================ */

// Bindet das Skript extract.php für Rohdaten ein und speichere es in $data
    $aareData = include('extract.php');

    //print_r($aareData);

    if (!isset($aareData['values']['bern'])) {
        throw new RuntimeException("Keine Daten für Bern vorhanden.");
    }

    // Initialisiert ein Array, um die transformierten Daten zu speichern
    $transformedData = [];

    if (!isset($aareData['values']) || !is_array($aareData['values'])) {
        throw new RuntimeException("Fehler: 'values' fehlt in den Rohdaten.");
    }

    $bernData = $aareData['values']['bern'];

    //print_r($aareData['values']['bern']);

    $transformedData = [
        // 'timestamp'   => $bernData['timestamp'] ?? null,
        'temperature' => isset($bernData['temperature']) ? (float)$bernData['temperature'] : null,
        'flow'        => isset($bernData['flow']) ? (float)$bernData['flow'] : null,
        'tt'          => isset($bernData['tt']) ? (float)$bernData['tt'] : null
    ];

    //print_r($transformedData);

    return $transformedData; // liefert ein assoziatives Array
} catch (Throwable $e) {
    throw $e;
}
// Transformiert und fügt die notwendigen Informationen hinzu
//foreach ($aareData as $location) {

    // Konstruiert die neue Struktur mit allen angegebenen Feldern, einschließlich des neuen 'condition'-Feldes
//}

// Kodiert die transformierten Daten in JSON

// Gibt die JSON-Daten zurück, anstatt sie auszugeben
