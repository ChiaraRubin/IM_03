console.log("Hallo");
fetch("https://r58eq3buzuj.preview.infomaniak.website/php/unload.php")
  .then((repsonse) => repsonse.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log("Error fetching data:", error);
  });
