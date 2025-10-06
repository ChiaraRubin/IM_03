<?php
$name = "Bruno";
$alter = 26;
$jahrgang = 1999;
$groesse = 1.58;

echo "Mein Name ist $name und ich bin $alter Jahre alt. $groesse bin ich gross, juhu!";
print_r($name);

$aktuellesAlter = 2025 - $jahrgang;
echo $alter;


if ($alter >= 18) {
    echo "Du darfst jedes Getränk bestellen.";
} elseif ($alter >= 16) {
    echo "Du darfst Bier und Wein bestellen.";
} elseif ($alter >= 10) {
    echo "Bitte hole deine Eltern";
} else {
    echo "Du darfst alkoholfreie Getränke bestellen";
};

function alterBerechnen($jahrgang) {
return date("Y") - $jahrgang;
}
echo alterBerechnen(2020);

function darfAlkoholBestellen($jahrgang) {
    $alter = alterBerechnen($jahrgang);
if ($alter >= 18) {
    echo "Du darfst jedes Getränk bestellen.";
} elseif ($alter >= 16) {
    echo "Du darfst Bier und Wein bestellen.";
} elseif ($alter >= 10) {
    echo "Bitte hole deine Eltern";
} else {
    echo "Du darfst alkoholfreie Getränke bestellen";
};
}

$fruechte = array("Apfel", "Banane", "Orange");

$wg = [];
array_ausgeben($wg, "Ursprüngliches Array");

array_push($wg, "Tommy");
array_ausgeben($wg, "Nach Hinzufügen von Tommy am Ende");

$wg = ["Beni", "Siro", "Jan", "Wolfgang"];
foreach($wg as $key => $value) {
    echo "WG-Mitglied $key: $value\n";
}

for ($i=0; $i < count($wg); $i++) {
    echo "WG-Mitglied $i: $wg[$i]\n";
}




?>