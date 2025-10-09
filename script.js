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
aktuelleWassertemperaturWert.innerHTML = aktuelleWassertemperatur + " °C";

// Aktuelle Wassermenge in eine Variable speichern und in den entsprechenden Kreis tun

let aktuelleWassermenge = allData[allData.length - 1].Wassermenge;
let aktuelleWasserMengeWert = document.querySelector("#aktuelleWasserMenge");
aktuelleWasserMengeWert.innerHTML = `${aktuelleWassermenge} m³/s`;

// Aktuelle Lufttemperatur in eine Variable speichern und in den entsprechenden Kreis tun

let aktuelleLufttemperatur = allData[allData.length - 1].Lufttemperatur;
let aktuelleLufttemperaturWert = document.querySelector(
  "#aktuelleLufttemperatur"
);
aktuelleLufttemperaturWert.innerHTML = aktuelleLufttemperatur + " °C";

// Fische entsprechend der Wassertemperatur austauschen
let aktuellerFisch = document.querySelector("#fischAktuell");
let aktuellerFischText = document.querySelector("#fischText");
let aktuellerFischTitel = document.querySelector("#aktuellerFisch");
let schwimmsack01 = document.querySelector("#schwimmsack01");
let schwimmsack02 = document.querySelector("#schwimmsack02");
let schwimmsack03 = document.querySelector("#schwimmsack03");
let schwimmsack04 = document.querySelector("#schwimmsack04");
let schwimmsack05 = document.querySelector("#schwimmsack05");

if (aktuelleWassertemperatur <= 4) {
  aktuellerFisch.src = "src/Handschuhe.png";
  aktuellerFisch.alt = "Handschuhe";
  aktuellerFischText.innerHTML =
    "Brr, es isch z'chalt zum go Fische gah! Aber vielicht isch en Spaziergang ade Aare entlang ganz schön!";
  aktuellerFischTitel.innerHTML = "Ned z'vergesse!";
  // Anzahl Schwimmtaschen auf der Startseite anpassen (kalte Temperaturen = wenig Schwimmtaschen; warme Temperaturen = viele Schwimmtaschen)
  schwimmsack01.classList.add("unsichtbar");
  schwimmsack02.classList.add("unsichtbar");
  schwimmsack03.classList.add("unsichtbar");
  schwimmsack04.classList.add("unsichtbar");
  schwimmsack05.classList.add("unsichtbar");
} else if (aktuelleWassertemperatur > 4 && aktuelleWassertemperatur < 8) {
  aktuellerFisch.src = "src/Hecht.png";
  aktuellerFisch.alt = "Hecht";
  aktuellerFischText.innerHTML =
    "Dr Hecht isch en Raubfisch us de Familie vo de Hechtartige. Er lebt vor allem i See, Teiche und langsam fliessendi Flüsse mit viu Wasserpflanze. Charakteristisch sind sini länglichi Körperform, de spitzige Chopf und sini scharfe Zähn. D’Färbig isch grünlich mit helli Flecke, wo em gueti Tarnig gäge Wasserpflanze git. Dr Hecht isch e sehr gfrässige Räuber und frisst Fisch, Frösche und Wasserinsekte. Als Spitzenräuber spielt er e wichtigi Roll für s’Gleichgwich im Gewässer.";
  aktuellerFischTitel.innerHTML = "Dr Hecht";
  // Anzahl Schwimmtaschen auf der Startseite anpassen (kalte Temperaturen = wenig Schwimmtaschen; warme Temperaturen = viele Schwimmtaschen)
  schwimmsack02.classList.add("unsichtbar");
  schwimmsack03.classList.add("unsichtbar");
  schwimmsack04.classList.add("unsichtbar");
  schwimmsack05.classList.add("unsichtbar");
} else if (aktuelleWassertemperatur >= 8 && aktuelleWassertemperatur < 14) {
  aktuellerFisch.src = "src/Bachforelle.png";
  aktuellerFisch.alt = "Bachforelle";
  aktuellerFischText.innerHTML =
    " D’Bachforelle isch en Süesswasserfisch us de Familie vo de Lachs. Sie lebt bevorzugt i klare, chüele und surstoffriche Bäch und Flüss mit steinigem Grund. Charakteristisch sind ihri goldbruni Färbig und die rote Punkt, wo oft vo helle Ring umgebe sind. Als standorttreuer Räuber ernährt sie sich vo Insekte, Larve und chlinere Fisch. Ökologisch gilt sie als Zeigerart: Gahts de Bachforelle guet, gahts em Gewässer meistens au guet.";
  aktuellerFischTitel.innerHTML = "D'Bachforelle";
  // Anzahl Schwimmtaschen auf der Startseite anpassen (kalte Temperaturen = wenig Schwimmtaschen; warme Temperaturen = viele Schwimmtaschen)
  schwimmsack02.classList.add("unsichtbar");
  schwimmsack03.classList.add("unsichtbar");
  schwimmsack05.classList.add("unsichtbar");
} else if (aktuelleWassertemperatur >= 14 && aktuelleWassertemperatur < 16) {
  aktuellerFisch.src = "src/Aesche.png";
  aktuellerFisch.alt = "Aesche";
  aktuellerFischText.innerHTML =
    "D’Äsche ghört wie d’Bachforelle zur Familie vo de Lachsartige. Sie liebt klari, kühle Flüsse mit kältigem Wasser und kiesigem Grund. Ihr Erkennigszeiche isch d’langi, farbig schillerendi Rückenflosse, wo wie e Segel uufragt. D’Färbig isch silbrig mit violette und blaugrüene Schimmer. D’Äsche ernährt sich vor allem vo Insekte und Larve, wo si us em Wasser pickt. Als Zeigerart gilt sie als empfindlich – drum isch ihr Vorchunft es sichers Zeichä für gueti Wasserqualität.";
  aktuellerFischTitel.innerHTML = "D’Äsche";
  // Anzahl Schwimmtaschen auf der Startseite anpassen (kalte Temperaturen = wenig Schwimmtaschen; warme Temperaturen = viele Schwimmtaschen)

  schwimmsack01.classList.add("unsichtbar");
  schwimmsack03.classList.add("unsichtbar");
} else {
  aktuellerFisch.src = "src/Egli.png";
  aktuellerFisch.alt = "Egli";
  aktuellerFischText.innerHTML =
    "D’Egli isch en Süesswasserfisch us de Familie vo de Barschartige. Sie lebt gärn i klare und mässig warme See und Flüsse. Charakteristisch sind ihrä silbrig-glänzendi Schuppe mit de dunkelgrüne Streife längs am Körper und de rotä Flosse. D’Egli bildet oft Schwärme und isch drum e wichtige Art im Mittelandsee. Ernährt wird sie sich vo Insekte, Würmer und chlinere Fische. Ökologisch gseh isch sie bedeutend für s’Gleichgwich i de Gewässer, will sie viu als Futterfisch dient.";
  aktuellerFischTitel.innerHTML = "D’Egli";
}

// Aktuelle Wassermenge in Anzahl Badewannen umrechnen und anschliessend mit .toFixed(2) auf zwei Kommastellen runden
let anzahlBadewannenWert = (aktuelleWassermenge * 1000) / 150;
let anzahlBadewannen = document.querySelector("#anzahlBadewannen");
anzahlBadewannen.innerHTML = anzahlBadewannenWert.toFixed(2);

// Daypicker
flatpickr("#dateRange", {
  mode: "range",
  dateFormat: "Y-m-d",
  locale: "de",
  onChange: function (selectedDates, dateStr) {
    if (selectedDates.length === 2) {
      const [start, end] = selectedDates;

      // Daten filtern
      const filteredData = allData.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= start && itemDate <= end;
      });

      // Chart aktualisieren
      updateChartWithData(filteredData);
    }
  },
});
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
