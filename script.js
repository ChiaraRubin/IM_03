// Variablen definieren, bzw. Verknüpfungen zum HTML Tag machen (Fische und entsprechender Text)
let aktuellerFisch = document.querySelector("#fischAktuell");
let aktuellerFischText = document.querySelector("#fischText");
let aktuellerFischTitel = document.querySelector("#aktuellerFisch");

// Variablen definieren, bzw. Verknüpfungen zum HTML Tag machen (Schwimmsäcke)
let schwimmsack01 = document.querySelector("#schwimmsack01");
let schwimmsack02 = document.querySelector("#schwimmsack02");
let schwimmsack03 = document.querySelector("#schwimmsack03");
let schwimmsack04 = document.querySelector("#schwimmsack04");
let schwimmsack05 = document.querySelector("#schwimmsack05");

// Chart-Variablen global definieren
let areaChart = null;
let balkenChart = null;

// "echte" aktuelle Werte speichern
let echteAktuelleWerte = null;

// Funktion, um den Durchschnitt auszurechnen
function berechneDurchschnitt(array) {
  let summe = 0;
  for (let i = 0; i < array.length; i++) {
    summe = summe + array[i];
  }
  let durchschnitt = summe / array.length;
  return durchschnitt;
}

// Funktion loadData schafft die Verbindung zum unload.php
async function loadData(start = "", ende = "") {
  try {
    const response = await fetch(
      `https://r58eq3buzuj.preview.infomaniak.website/php/unload.php?start=${start}&ende=${ende}`
    );
    const data = await response.json();
    console.log("data is loaded");
    showData(data);
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

// Funktion loadData wird aufgerufen
loadData();
console.log("script.js loaded");

// Funktion, um Daten nach Datum zu gruppieren
function gruppiereNachDatum(allData) {
  let dailyData = {};

  allData.forEach(function (datensatz) {
    let zeitString = datensatz.Zeit.replace(" ", "T");
    let datumObjekt = new Date(zeitString);

    let tag = datumObjekt.getDate();
    if (tag < 10) {
      tag = "0" + tag;
    } else {
      tag = String(tag);
    }

    let monat = datumObjekt.getMonth() + 1;
    if (monat < 10) {
      monat = "0" + monat;
    } else {
      monat = String(monat);
    }

    let jahr = String(datumObjekt.getFullYear());
    let datum = tag + "." + monat + "." + jahr;

    if (dailyData[datum] === undefined) {
      dailyData[datum] = {
        lufttemperatur: [],
        wassertemperatur: [],
        wassermenge: [],
      };
    }

    dailyData[datum].lufttemperatur.push(parseFloat(datensatz.Lufttemperatur));
    dailyData[datum].wassertemperatur.push(
      parseFloat(datensatz.Wassertemperatur)
    );
    dailyData[datum].wassermenge.push(parseFloat(datensatz.Wassermenge));
  });

  return dailyData;
}

// Funktion, um Durchschnittswerte zu berechnen
function berechneDurchschnittswerte(dailyData) {
  let zeit = [];
  let lufttemperatur = [];
  let wassertemperatur = [];
  let wassermenge = [];

  for (let datum in dailyData) {
    zeit.push(datum);

    let durchschnittLuft = berechneDurchschnitt(
      dailyData[datum].lufttemperatur
    );
    let durchschnittWasser = berechneDurchschnitt(
      dailyData[datum].wassertemperatur
    );
    let durchschnittMenge = berechneDurchschnitt(dailyData[datum].wassermenge);

    lufttemperatur.push(durchschnittLuft.toFixed(2));
    wassertemperatur.push(durchschnittWasser.toFixed(2));
    wassermenge.push(durchschnittMenge.toFixed(2));
  }

  return { zeit, lufttemperatur, wassertemperatur, wassermenge };
}

// Funktion, um Charts zu erstellen oder zu aktualisieren
function aktualisiereCharts(durchschnittswerte) {
  let { zeit, lufttemperatur, wassertemperatur, wassermenge } =
    durchschnittswerte;

  // Area Chart (Luft- und Wassertemperatur)
  let areaChartCanvas = document.querySelector("#areaChart");

  if (areaChart) {
    // Chart existiert bereits -> nur Daten aktualisieren
    areaChart.data.labels = zeit;
    areaChart.data.datasets[0].data = wassertemperatur;
    areaChart.data.datasets[1].data = lufttemperatur;
    areaChart.update();
  } else {
    // Chart erstmalig erstellen
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
          title: { display: true },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    };

    areaChart = new Chart(areaChartCanvas, areaConfig);
  }

  // Balken Chart (Wassermenge)
  let balken = document.querySelector("#balken");

  if (balkenChart) {
    // Chart existiert bereits -> nur Daten aktualisieren
    balkenChart.data.labels = zeit;
    balkenChart.data.datasets[0].data = wassermenge;
    balkenChart.update();
  } else {
    // Chart erstmalig erstellen
    const data = {
      labels: zeit,
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
          legend: { position: "top" },
          title: { display: true },
        },
      },
    };

    balkenChart = new Chart(balken, config);
  }
}

function showData(allData) {
  // aktuellen Werte beim ersten Laden speichern
  if (echteAktuelleWerte === null) {
    echteAktuelleWerte = {
      wassertemperatur: allData[allData.length - 1].Wassertemperatur,
      wassermenge: allData[allData.length - 1].Wassermenge,
      lufttemperatur: allData[allData.length - 1].Lufttemperatur,
    };
  }

  // Aktuelle Wassertemperatur
  let aktuelleWassertemperatur = echteAktuelleWerte.wassertemperatur;
  let aktuelleWassertemperaturWert = document.querySelector(
    "#aktuelleWassertemperatur"
  );
  aktuelleWassertemperaturWert.innerHTML = aktuelleWassertemperatur + " °C";
  // Aktuelle Wassermenge
  let aktuelleWassermenge = echteAktuelleWerte.wassermenge;
  let aktuelleWasserMengeWert = document.querySelector("#aktuelleWasserMenge");
  aktuelleWasserMengeWert.innerHTML = `${aktuelleWassermenge} m³/s`;
  // Aktuelle Lufttemperatur
  let aktuelleLufttemperatur = echteAktuelleWerte.lufttemperatur;
  let aktuelleLufttemperaturWert = document.querySelector(
    "#aktuelleLufttemperatur"
  );
  aktuelleLufttemperaturWert.innerHTML = aktuelleLufttemperatur + " °C";

  // Fische und Schwimmsäcke anzeigen
  if (aktuelleWassertemperatur <= 4) {
    aktuellerFisch.src = "src/Handschuhe.png";
    aktuellerFisch.alt = "Handschuhe";
    aktuellerFischText.innerHTML =
      "Brr, es isch z'chalt zum go Fische gah! Aber vielicht isch en Spaziergang ade Aare entlang ganz schön!";
    aktuellerFischTitel.innerHTML = "Ned z'vergesse!";
    schwimmsack01.classList.add("unsichtbar");
    schwimmsack02.classList.add("unsichtbar");
    schwimmsack03.classList.add("unsichtbar");
    schwimmsack04.classList.add("unsichtbar");
    schwimmsack05.classList.add("unsichtbar");
  } else if (aktuelleWassertemperatur > 4 && aktuelleWassertemperatur < 8) {
    aktuellerFisch.src = "src/Hecht.png";
    aktuellerFisch.alt = "Hecht";
    aktuellerFischText.innerHTML =
      "Dr Hecht isch en Raubfisch us de Familie vo de Hechtartige. Er lebt vor allem i See, Teiche und langsam fliessendi Flüsse mit viu Wasserpflanze. Charakteristisch sind sini länglichi Körperform, de spitzige Chopf und sini scharfe Zähn. D'Färbig isch grünlich mit helli Flecke, wo em gueti Tarnig gäge Wasserpflanze git. Dr Hecht isch e sehr gfrässige Räuber und frisst Fisch, Frösche und Wasserinsekte. Als Spitzenräuber spielt er e wichtigi Roll für s'Gleichgwich im Gewässer.";
    aktuellerFischTitel.innerHTML = "Dr Hecht";
    schwimmsack02.classList.add("unsichtbar");
    schwimmsack03.classList.add("unsichtbar");
    schwimmsack04.classList.add("unsichtbar");
    schwimmsack05.classList.add("unsichtbar");
  } else if (aktuelleWassertemperatur >= 8 && aktuelleWassertemperatur < 14) {
    aktuellerFisch.src = "src/Bachforelle.png";
    aktuellerFisch.alt = "Bachforelle";
    aktuellerFischText.innerHTML =
      " D'Bachforelle isch en Süesswasserfisch us de Familie vo de Lachs. Sie lebt bevorzugt i klare, chüele und surstoffriche Bäch und Flüss mit steinigem Grund. Charakteristisch sind ihri goldbruni Färbig und die rote Punkt, wo oft vo helle Ring umgebe sind. Als standorttreuer Räuber ernährt sie sich vo Insekte, Larve und chlinere Fisch. Ökologisch gilt sie als Zeigerart: Gahts de Bachforelle guet, gahts em Gewässer meistens au guet.";
    aktuellerFischTitel.innerHTML = "D'Bachforelle";
    schwimmsack02.classList.add("unsichtbar");
    schwimmsack03.classList.add("unsichtbar");
    schwimmsack05.classList.add("unsichtbar");
  } else if (aktuelleWassertemperatur >= 14 && aktuelleWassertemperatur < 16) {
    aktuellerFisch.src = "src/Aesche.png";
    aktuellerFisch.alt = "Aesche";
    aktuellerFischText.innerHTML =
      "D'Äsche ghört wie d'Bachforelle zur Familie vo de Lachsartige. Sie liebt klari, kühle Flüsse mit kältigem Wasser und kiesigem Grund. Ihr Erkennigszeiche isch d'langi, farbig schillerendi Rückenflosse, wo wie e Segel uufragt. D'Färbig isch silbrig mit violette und blaugrüene Schimmer. D'Äsche ernährt sich vor allem vo Insekte und Larve, wo si us em Wasser pickt. Als Zeigerart gilt sie als empfindlich – drum isch ihr Vorchunft es sichers Zeichä für gueti Wasserqualität.";
    aktuellerFischTitel.innerHTML = "D'Äsche";
    schwimmsack01.classList.add("unsichtbar");
    schwimmsack03.classList.add("unsichtbar");
  } else {
    aktuellerFisch.src = "src/Egli.png";
    aktuellerFisch.alt = "Egli";
    aktuellerFischText.innerHTML =
      "D'Egli isch en Süesswasserfisch us de Familie vo de Barschartige. Sie lebt gärn i klare und mässig warme See und Flüsse. Charakteristisch sind ihrä silbrig-glänzendi Schuppe mit de dunkelgrüne Streife längs am Körper und de rotä Flosse. D'Egli bildet oft Schwärme und isch drum e wichtige Art im Mittelandsee. Ernährt wird sie sich vo Insekte, Würmer und chlinere Fische. Ökologisch gseh isch sie bedeutend für s'Gleichgwich i de Gewässer, will sie viu als Futterfisch dient.";
    aktuellerFischTitel.innerHTML = "D'Egli";
  }

  // Badewannen berechnen
  let anzahlBadewannenWert = (aktuelleWassermenge * 1000) / 150;
  let anzahlBadewannen = document.querySelector("#anzahlBadewannen");
  anzahlBadewannen.innerHTML = anzahlBadewannenWert.toFixed(2);

  // Daten verarbeiten und Charts aktualisieren
  let dailyData = gruppiereNachDatum(allData);
  let durchschnittswerte = berechneDurchschnittswerte(dailyData);
  aktualisiereCharts(durchschnittswerte);
}

// Daypicker
flatpickr("#dateRange", {
  mode: "range",
  dateFormat: "Y-m-d",
  locale: "de",
  onChange: function (selectedDates, dateStr) {
    console.log(selectedDates);
    console.log(dateStr);
    if (selectedDates.length === 2) {
      let startDatum = selectedDates[0];
      let endDatum = selectedDates[1];

      // Startdatum um 1 Tag verkürzen
      let startDatumMinus1 = new Date(startDatum);
      startDatumMinus1.setDate(startDatumMinus1.getDate() - 1);

      // Enddatum um 1 Tag verlängern
      let endDatumPlus2 = new Date(endDatum);
      endDatumPlus2.setDate(endDatumPlus2.getDate() + 2);

      // Formatierung ins richtige Format
      let startString = startDatum.toISOString().split("T")[0];
      let endString = endDatumPlus2.toISOString().split("T")[0];

      console.log("Start:", startString);
      console.log("Ende:", endString);

      loadData(startString, endString);
    }
  },
});
