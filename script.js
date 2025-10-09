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
console.log("Nein");

// Versuch
//let einzelneTemperaturwerte =

//Luft und Wassertemperatur
let areaChartCanvas = document.querySelector("#areaChart");

const areaData = {
  labels: [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
  ],
  datasets: [
    {
      label: "Wassertemperatur",
      data: [200, 400, 700, 110, 150, 190, 200, 350],
      borderColor: "#D3726D",
      backgroundColor: "#D3726D",
      fill: true,
      tension: 0.3,
    },
    {
      label: "Temperatur",
      data: [3, 5, 9, 14, 18, 22, 25, 26],
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

const labels = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "Wassermängi",
      data: [28, 48, 40, 19, 86, 27, 90],
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
