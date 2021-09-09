"use strict";

const button = document.querySelector(".js_button");
const givenInput = document.querySelector(".js_input");

//variable local que almacena el resultado de la búsqueda de las series introducida en el input de texto
let series = [];

//función manejadora del evento click de button.addEventListener para que al hacer click en el botón, la aplicación se conecta a la api de TVMaze
function handleConnectTv(ev) {
  //impide que el valor se borre cd le damos al botón de buscar
  //ev.preventDefault();
  //variable que recoge el valor introducido por usuaria
  let textInput = givenInput.value;
  //parámetros a la URL de tipo clave=valor, siempre tras ? y separados por &,
  // p.e. para pedir string con longitud determinada, la url quedaría así https://api.rand.fun/text/password?length=20

  fetch(`https://api.tvmaze.com/search/shows?q=${textInput}`)
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      //   series = data.series;
      //   console.log(series);
      // input.value = url + ending
      series = data;
      console.log(series);
      //función para que la búsqueda del input resulte en un listado de series con título y cartel (imagen)
      paintSeries();
    });
}

button.addEventListener("click", handleConnectTv);

//función para que la búsqueda del input resulte en un listado de series con título y cartel (imagen)
function handleConnectTv() {
  let html = "";

  for (const serie of series) {
    html += `<li class= 'listItem js_listItem' id='${serie.show.id}'>`;
    html += `<h2>${serie.show.name}</h2>`;
    //bucle con if para caso en el que no exista cartel de la serie.
    //habrá que subir la img al proyecto.
    html += `<div>`;
    html += `</div>`;
    html += `</li>`;
  }
}
