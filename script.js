// Hier verbinden wir die JS-Variablen mit den HTML-Elementen. Mit dem "querySelector" suchen wir dabei im HTML nach dem Element mit der entsprechenden ID
let aktuellerFisch = document.querySelector("#fischAktuell");
let aktuellerFischText = document.querySelector("#fischText");
let aktuellerFischTitel = document.querySelector("#aktuellerFisch");

// Hier passiert dasselbe wie oben: Variablen (hier die Schwimmsäcke) werden definiert und mittels des querySelectors im HTML Dokument gesucht
let schwimmsack01 = document.querySelector("#schwimmsack01");
let schwimmsack02 = document.querySelector("#schwimmsack02");
let schwimmsack03 = document.querySelector("#schwimmsack03");
let schwimmsack04 = document.querySelector("#schwimmsack04");
let schwimmsack05 = document.querySelector("#schwimmsack05");

// Wir definieren globale Variablen, d.h. diese können wir von überall im Code verwenden
// Die beiden Diagramme (Charts) werden gespeichert, wenn sie erstellt werden
let areaChart = null;
let balkenChart = null;

// Die aktuellsten Werte werden aus der Datenbank gespeichert (diese werden nicht überschrieben, wenn der*die User*in einen Zeitraum auswählt)
let echteAktuelleWerte = null;

// Leere Arrays werden erstellt (für die Temperatur-Daten und die Wassermenge-Daten). Hier werden die geladenen Daten aus der Datenbank reingespeichert
let tempData = [];
let amountData = [];

// Funktion, um den Durchschnitt auszurechnen
function berechneDurchschnitt(array) {
  // Alle Zahlen werden mit der "for-Schleife" zusammengerechnet
  let summe = 0;
  for (let i = 0; i < array.length; i++) {
    summe = summe + array[i];
  }
  // Die Summe der Zahlen wird durch die Anzahl geteilt. Das ergibt den Durchschnitt
  let durchschnitt = summe / array.length;
  return durchschnitt;
}

// Die Funktion "loadData" schafft die Verbindung zum unload.php Dokument => der Start und das Ende sind dabei optional (für die Zeitraum Auswahl) => der Standard von "start" und "ende" ist leer, was bedeutet, dass der gesamte Zeitraum angezeigt wird
// der Parameter "diagram" sagt, welche Art von Daten ("temp" oder "amount") gespeichert werden (und später visualisiert)
async function loadData(start = "", ende = "", diagram = "") {
  try {
    // Eine Anfrage wird an das PHP Skript gesendet, das die Daten aus der Datenbank zurückliefert
    const response = await fetch(
      `https://r58eq3buzuj.preview.infomaniak.website/php/unload.php?start=${start}&ende=${ende}`
    );
    // Die Antwort vom Server wird in das passende Array geschrieben (die Serveranfrage ist für beide Diagramme(Charts) gleich, der Parameter "diagram" entscheidet aber, wohin die Daten gespeichert werden)
    if (diagram === "temp") {
      //Hier werden die Temperaturdaten gespeichert
      tempData = await response.json();
    } else {
      // Und hier werden die Mengendaten gespeichert
      amountData = await response.json();
    }
    // Nach erfolgreichem Laden wird die Anzeige aktualisiert
    showData(diagram);
  } catch (error) {
    // Falls es einen Fehler gibt, wird eine Fehlermeldung in der Konsole ausgegeben
    console.log("Error fetching data:", error);
  }
}

// Beim Start der Seite werden beide Datentypen ("temp" = Temperaturdaten und "amount" = Wassermengendaten) geladen (ohne einen bestimmten Zeitraum, da keine Start- und Enddaten angegeben sind)
loadData("", "", "temp");
loadData("", "", "amount");

// Funktion, um die Daten nach Datum zu gruppieren
function gruppiereNachDatum(allData) {
  // Ein leeres Objekt = {} wird für die gruppierten Daten erstellt
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
function aktualisiereCharts(durchschnittswerte, diagram) {
  let { zeit, lufttemperatur, wassertemperatur, wassermenge } =
    durchschnittswerte;

  if (diagram === "temp") {
    // Area Chart (Luft- und Wassertemperatur)
    let areaChartCanvas = document.querySelector("#areaChart");

    if (areaChart) {
      // Chart existiert bereits -> nur Daten aktualisieren
      areaChart.data.labels = zeit;
      areaChart.data.datasets[0].data = wassertemperatur;
      areaChart.data.datasets[1].data = lufttemperatur;
      areaChart.update();
    } else {
      // Bildschirmbreite prüfen
      let istKleinerBildschirm = window.innerWidth < 500;

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
          maintainAspectRatio: istKleinerBildschirm ? false : true,
          plugins: {
            legend: { position: "top" },
            title: { display: true },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return (
                    context.dataset.label + ": " + context.parsed.y + " °C"
                  );
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return value + " °C";
                },
              },
            },
          },
        },
      };

      areaChart = new Chart(areaChartCanvas, areaConfig);

      // Höhe nur auf kleinen Bildschirmen setzen
      if (istKleinerBildschirm) {
        areaChart.canvas.parentNode.style.height = "400px";
      }
    }
  } else {
    // Balken Chart (Wassermenge)
    let balken = document.querySelector("#balken");

    if (balkenChart) {
      // Chart existiert bereits -> nur Daten aktualisieren
      balkenChart.data.labels = zeit;
      balkenChart.data.datasets[0].data = wassermenge;
      balkenChart.update();
    } else {
      // Bildschirmbreite prüfen
      let istKleinerBildschirm = window.innerWidth < 500;

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
          maintainAspectRatio: istKleinerBildschirm ? false : true,
          plugins: {
            legend: { position: "top" },
            title: { display: true },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return (
                    context.dataset.label + ": " + context.parsed.y + " m³/s"
                  );
                },
              },
            },
          },
          scales: {
            y: {
              ticks: {
                callback: function (value) {
                  return value + " m³/s";
                },
              },
            },
          },
        },
      };

      balkenChart = new Chart(balken, config);

      // Höhe nur auf kleinen Bildschirmen setzen
      if (istKleinerBildschirm) {
        balkenChart.canvas.parentNode.style.height = "400px";
      }
    }
  }
}

function showData(diagram) {
  const allData = diagram === "temp" ? tempData : amountData;
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

  schwimmsack01.classList.add("unsichtbar");
  schwimmsack02.classList.add("unsichtbar");
  schwimmsack03.classList.add("unsichtbar");
  schwimmsack04.classList.add("unsichtbar");
  schwimmsack05.classList.add("unsichtbar");
  // Fische und Schwimmsäcke anzeigen
  if (aktuelleWassertemperatur <= 4) {
    aktuellerFisch.src = "src/Handschuhe.png";
    aktuellerFisch.alt = "Handschuhe";
    aktuellerFischText.innerHTML =
      "Brr, es isch z'chalt zum go Fische gah! Aber vielicht isch en Spaziergang ade Aare entlang ganz schön!";
    aktuellerFischTitel.innerHTML = "Ned z'vergesse!";
    // keine Schwimmsäcke sichtbar
  } else if (aktuelleWassertemperatur > 4 && aktuelleWassertemperatur < 8) {
    aktuellerFisch.src = "src/Hecht.png";
    aktuellerFisch.alt = "Hecht";
    aktuellerFischText.innerHTML =
      "Dr Hecht isch ä Roubfisch us dr Familiä vo dä Hechtartigä. Är läbt vor auem i See, Teichä und langsam fliessendä Flüss mit viu Wasserpflanzä. Charakteristisch isch sini länglächi Körperform, dr spitzig Chopf und sini scharfä Zähn. D'Färbig isch grüänläch mit häuä Fläckä, wo ihm ä gueti Tarnig gägä Wasserpflanzä git. Dr Hecht isch e sehr gfrässigä Röiber und frisst Fischä, Frösch und Wasserinsektä. Us Spitzäröiber spiut är ä wichtigi Rouä für z'Glichgwicht im Gwässer.";
    aktuellerFischTitel.innerHTML = "Dr Hecht";
    schwimmsack01.classList.remove("unsichtbar");
  } else if (aktuelleWassertemperatur >= 8 && aktuelleWassertemperatur < 14) {
    aktuellerFisch.src = "src/Bachforelle.png";
    aktuellerFisch.alt = "Bachforelle";
    aktuellerFischText.innerHTML =
      "D'Bachforäuä isch ä Süesswasserfisch us dr Familiä vo de Lachs. Si läbt bevorzugt i klarä, chüelä und surstoffrichä Bäch und Flüss mit stigendem Grund. Charakteristisch isch ihri guudbruni Färbig und die rote Pünkt, wo oft vo häuä Ringä umgäbä si. Us standorttröii Röiberin ernährt si säch vo Insektä, Larvä und chlinerä Fischä. Ökologisch giutet si us Zeigärart: Geits dr Bachforäuä guet, geits am Gwässer meistens ou guet.";
    aktuellerFischTitel.innerHTML = "D'Bachforelle";
    schwimmsack01.classList.remove("unsichtbar");
    schwimmsack04.classList.remove("unsichtbar");
  } else if (aktuelleWassertemperatur >= 14 && aktuelleWassertemperatur < 16) {
    aktuellerFisch.src = "src/Aesche.png";
    aktuellerFisch.alt = "Aesche";
    aktuellerFischText.innerHTML =
      "D'Äsche ghört wie d'Bachforäuä zur Familiä vo de Lachsartigä. Si liebt klari, chüehli Flüss mit chautem Wasser und chiisigem Grund. Ihres Erkennigszeichä isch diä längi, farbigi schiuerendi Rückäflossä, wo wie ä Sägä uftreit. D'Färbig isch siubrig mit violettä und blaugrüenä Schimmer. D'Äsche ernährt säch vor auem vo Insektä und Larvä, wo si us em Wasser pickt. Us Zeigärart giutet si us empfindläch, drum isch ihres Vorcho es sichers Zeichä für nä gueti Wasserqualität.";
    aktuellerFischTitel.innerHTML = "D'Äsche";
    schwimmsack02.classList.remove("unsichtbar");
    schwimmsack04.classList.remove("unsichtbar");
    schwimmsack05.classList.remove("unsichtbar");
  } else {
    aktuellerFisch.src = "src/Egli.png";
    aktuellerFisch.alt = "Egli";
    aktuellerFischText.innerHTML =
      "Dr Egli isch ä Süesswasserfisch us dr Familiä vo de Barschartigä. Är läbt gärn i klarä und mässig warmä See und Flüss. Charakteristisch si sini siubrig-glänzendä Schuppä mit dä dunkugrüenä Streifä längs am Körper und dä rotä Flossä. Dr Egli biudet oft Schwärm und isch drum ä wichtigi Art im Mittulandsee. Ernährt wird duet är säch vo Insektä, Würmer und chlinerä Fischä. Ökologisch gseh isch är bedütend für z'Gleichgwicht i dä Gwässer, wu är viu us Fuetterfisch dient.";
    aktuellerFischTitel.innerHTML = "D'Egli";
    schwimmsack01.classList.remove("unsichtbar");
    schwimmsack02.classList.remove("unsichtbar");
    schwimmsack03.classList.remove("unsichtbar");
    schwimmsack04.classList.remove("unsichtbar");
    schwimmsack05.classList.remove("unsichtbar");
  }

  // Badewannen berechnen
  let anzahlBadewannenWert = (aktuelleWassermenge * 1000) / 150;
  let anzahlBadewannen = document.querySelector("#anzahlBadewannen");
  anzahlBadewannen.innerHTML = anzahlBadewannenWert.toFixed(2);

  // Daten verarbeiten und Charts aktualisieren
  let dailyData = gruppiereNachDatum(allData);
  let durchschnittswerte = berechneDurchschnittswerte(dailyData);
  aktualisiereCharts(durchschnittswerte, diagram);
}

// Datum in verständlicheres Format umwandeln
function formatiereLokalDatum(datum) {
  let jahr = datum.getFullYear();
  let monat = String(datum.getMonth() + 1).padStart(2, "0");
  let tag = String(datum.getDate()).padStart(2, "0");
  return `${jahr}-${monat}-${tag}`;
}

// Daypicker 01
flatpickr("#dateRange01", {
  mode: "range",
  dateFormat: "Y-m-d",
  locale: "de",
  onChange: function (selectedDates, dateStr) {
    if (selectedDates.length === 2) {
      let startString = formatiereLokalDatum(selectedDates[0]);
      let endString = formatiereLokalDatum(selectedDates[1]);

      console.log("Start:", startString);
      console.log("Ende:", endString);

      loadData(startString, endString, "temp");
    }
  },
});

// Daypicker 02
flatpickr("#dateRange02", {
  mode: "range",
  dateFormat: "Y-m-d",
  locale: "de",
  onChange: function (selectedDates, dateStr) {
    if (selectedDates.length === 2) {
      let startString = formatiereLokalDatum(selectedDates[0]);
      let endString = formatiereLokalDatum(selectedDates[1]);

      console.log("Start:", startString);
      console.log("Ende:", endString);

      loadData(startString, endString, "amount");
    }
  },
});

// Resize EventListener - Charts bei Fenstergrößenänderung aktualisieren
window.addEventListener("resize", () => {
  // Prüfen ob Charts existieren, bevor wir sie updaten
  if (areaChart) {
    let istKleinerBildschirm = window.innerWidth < 500;
    areaChart.options.maintainAspectRatio = istKleinerBildschirm ? false : true;

    if (istKleinerBildschirm) {
      areaChart.canvas.parentNode.style.height = "400px";
    } else {
      areaChart.canvas.parentNode.style.height = "";
    }

    areaChart.resize();
  }

  if (balkenChart) {
    let istKleinerBildschirm = window.innerWidth < 500;
    balkenChart.options.maintainAspectRatio = istKleinerBildschirm
      ? false
      : true;

    if (istKleinerBildschirm) {
      balkenChart.canvas.parentNode.style.height = "400px";
    } else {
      balkenChart.canvas.parentNode.style.height = "";
    }

    balkenChart.resize();
  }
});
