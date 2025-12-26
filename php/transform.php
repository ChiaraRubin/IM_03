<?php
try {

    // Bindet extract.php ein und speichert die Rohdaten in $aareData
    $aareData = include('extract.php');

    // Prüft, ob das 'values'-Feld existiert und ein Array ist
    if (!isset($aareData['values']) || !is_array($aareData['values'])) {
        throw new RuntimeException("Fehler: 'values' fehlt in den Rohdaten.");
    }

    // Prüft, ob Daten für Bern vorhanden sind
    if (!isset($aareData['values']['bern'])) {
        throw new RuntimeException("Keine Daten für Bern vorhanden.");
    }

    // Extrahiert die Bern-spezifischen Daten
    $bernData = $aareData['values']['bern'];

    // Transformiert die Daten in ein strukturiertes Format
    $transformedData = [
        'temperature' => isset($bernData['temperature']) ? (float)$bernData['temperature'] : null,
        'flow'        => isset($bernData['flow']) ? (float)$bernData['flow'] : null,
        'tt'          => isset($bernData['tt']) ? (float)$bernData['tt'] : null
    ];

    // Gibt das transformierte Array zurück
    return $transformedData; 

} catch (Throwable $e) {
    // Wirft Fehler nach oben weiter (für bessere Fehlerbehandlung)
    throw $e;
}
?>

