console.log("Hallo");

async function loadData() {
  try {
    const response = await fetch(
      "https://r58eq3buzuj.preview.infomaniak.website/php/unload.php"
    );
    const data = await response.json();
    console.log("data is loaded");
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

console.log("script.js loaded");

let allData = await loadData();

// Aktuelle Wassertemperatur in eine Variable speichern und in den entsprechenden Kreis tun
let aktuelleWassertemperatur = allData[allData.length - 1].Wassertemperatur;

let aktuelleWassertemperaturWert = document.querySelector(
  "#aktuelleWassertemperatur"
);
aktuelleWassertemperaturWert.innerHTML = aktuelleWassertemperatur;

// Aktuelle Wassermenge in eine Variable speichern und in den entsprechenden Kreis tun

let aktuelleWassermenge = allData[allData.length - 1].Wassermenge;
let aktuelleWasserMengeWert = document.querySelector("#aktuelleWasserMenge");
aktuelleWasserMengeWert.innerHTML = `${aktuelleWassermenge}m <sup>3</sup>/s`;

// Aktuelle Lufttemperatur in eine Variable speichern und in den entsprechenden Kreis tun

let aktuelleLufttemperatur = allData[allData.length - 1].Lufttemperatur;
let aktuelleLufttemperaturWert = document.querySelector(
  "#aktuelleLufttemperatur"
);
aktuelleLufttemperaturWert.innerHTML = aktuelleLufttemperatur;

// Fische entsprechend der Wassertemperatur austauschen
if (aktuelleWassertemperatur < 8 && aktuelleWassertemperatur > 4) {
  let hecht = document.querySelector("#fischAktuell");

  hecht.src = "src/Hecht.png";
  hecht.alt = "Hecht";
} else {
  hecht.src = "src/Hecht.png";
}

// --- Daten nach Datum gruppieren und Durchschnitt berechnen ---
let dailyData = {};

allData.forEach(function (datensatz) {
  // Zeitstempel in ein Date-Objekt umwandeln
  let zeitString = datensatz.Zeit.replace(" ", "T");
  // 1. Datum erstellen
  let datumObjekt = new Date(zeitString); // z.B. heutiges Datum

  // 2. Tag holen
  let tag = datumObjekt.getDate(); // Zahl zwischen 1 und 31

  // 3. Prüfen, ob wir eine führende Null brauchen
  if (tag < 10) {
    tag = "0" + tag; // vorne eine "0" anhängen
  } else {
    tag = String(tag); // sonst in String umwandeln
  }

  // 1. Monat holen (0 = Januar, 11 = Dezember)
  let monat = datumObjekt.getMonth() + 1; // +1, weil getMonth() 0-basiert ist

  // 2. Prüfen, ob wir eine führende Null brauchen
  if (monat < 10) {
    monat = "0" + monat; // vorne eine "0" anhängen
  } else {
    monat = String(monat); // sonst in String umwandeln
  }

  // Jetzt ist monat immer zweistellig, z.B. "01" oder "12"
  console.log(monat);

  let jahr = datumObjekt.getFullYear();

  jahr = String(jahr);

  console.log(jahr);

  // Datum im Format TT.MM.JJ zusammensetzen
  let datum = tag + "." + monat + "." + jahr;

  // Prüfen, ob das Datum im Objekt dailyData existiert
  if (dailyData[datum] === undefined) {
    dailyData[datum] = {
      lufttemperatur: [],
      wassertemperatur: [],
      wassermenge: [],
    };
  }

  // Werte als Zahlen hinzufügen
  dailyData[datum].lufttemperatur.push(parseFloat(datensatz.Lufttemperatur));
  dailyData[datum].wassertemperatur.push(
    parseFloat(datensatz.Wassertemperatur)
  );
  dailyData[datum].wassermenge.push(parseFloat(datensatz.Wassermenge));
});

// --- Durchschnitt pro Tag berechnen ---
let zeit = [];
let lufttemperatur = [];
let wassertemperatur = [];
let wassermenge = [];

// Hilfsfunktion für Durchschnitt
function berechneDurchschnitt(array) {
  let summe = 0;
  for (let i = 0; i < array.length; i++) {
    summe = summe + array[i];
  }
  let durchschnitt = summe / array.length;
  return durchschnitt;
}

// Über alle Datumswerte iterieren
for (let datum in dailyData) {
  zeit.push(datum);

  let durchschnittLuft = berechneDurchschnitt(dailyData[datum].lufttemperatur);
  let durchschnittWasser = berechneDurchschnitt(
    dailyData[datum].wassertemperatur
  );
  let durchschnittMenge = berechneDurchschnitt(dailyData[datum].wassermenge);

  lufttemperatur.push(durchschnittLuft.toFixed(2));
  wassertemperatur.push(durchschnittWasser.toFixed(2));
  wassermenge.push(durchschnittMenge.toFixed(2));
}

console.log("Tageswerte:", zeit, lufttemperatur, wassertemperatur, wassermenge);

//Luft und Wassertemperatur
let areaChartCanvas = document.querySelector("#areaChart");

const areaData = {
  labels: zeit,
  datasets: [
    {
      label: "Wassertemperatur",
      data: wassertemperatur,
      borderColor: "#D3726D",
      backgroundColor: "#D3726D",
      fill: true,
      tension: 0.3,
    },
    {
      label: "Lufttemperatur",
      data: lufttemperatur,
      borderColor: "#E0A29A",
      backgroundColor: "#E0A29A",
      fill: true,
      tension: 0.3,
    },
  ],
};

const areaConfig = {
  type: "line",
  data: areaData,
  options: {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

const areaChart = new Chart(areaChartCanvas, areaConfig);

//Wassermängi

let balken = document.querySelector("#balken");

const DATA_COUNT = 7;

const labels = zeit;
const data = {
  labels: labels,
  datasets: [
    {
      label: "Wassermängi",
      data: wassermenge,
      backgroundColor: "#E0A29A",
    },
  ],
};
const config = {
  type: "bar",
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  },
};
const chart = new Chart(balken, config);
