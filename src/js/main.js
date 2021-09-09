"use strict";

const button = document.querySelector(".js_button");

//variable local que almacena el resultado de la búsqueda de las series introducida en el input de texto
let series = [];

//función manejadora del evento click de button.addEventListener para que al hacer click en el botón, la aplicación se conecta a la api de TVMaze
function handleConnectTv(ev) {
  fetch("https://api.tvmaze.com/search/shows?q=girls")
    .then((response) => response.json())
    .then((data) => {});
  series = data.series;
  //función para que la búsqueda del input resulte en un listado de series
  console.log(response);
}

button.addEventListener("click", handleConnectTv);

console.log("holis");
