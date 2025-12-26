<?php

function fetchAareData()
{
     // URL der Aareguru API (liefert aktuelle Aare-Daten für Bern)
    $url = "https://aareguru.existenz.ch/v2018/widget";

    // Initialisiert eine cURL-Sitzung  (Anmerkung curl => steht für Client for URLs) 
    $ch = curl_init($url);

    // Setzt Option: Response als String zurückgeben statt direkt ausgeben
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Führt die cURL-Sitzung aus und erhält die Antwort als String
    $response = curl_exec($ch);
    // Schliesst die cURL-Sitzung
    curl_close($ch);

    // Dekodiert die JSON-Antwort in ein assoziatives PHP-Array und gibt das Array zurück
    $data = json_decode($response, true);
    return $data;
}

// Gibt die Daten zurück, wenn dieses Skript eingebunden ist
return fetchAareData();
?>
