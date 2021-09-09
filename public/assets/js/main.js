"use strict";

const button = document.querySelector(".js_button");
const givenInput = document.querySelector(".js_input");

//variable local que almacena el resultado de la búsqueda de las series introducida en el input de texto
let series = [];

//función manejadora del evento click de button.addEventListener para que al hacer click en el botón, la aplicación se conecta a la api de TVMaze
//??porqué siempre me da las mismas 10 series?
function handleConnectTv(ev) {
  //impide que el valor se borre cd le damos al botón de buscar

  //variable que recoge el valor introducido por usuaria
  let textInput = givenInput.value;
  //parámetros a la URL del tipo clave=valor, siempre tras ? y separados por &,
  // por ejemplo si quisieras pedir un string con determinada longitud, la url quedaría así https://api.rand.fun/text/password?length=20

  fetch(`https://api.tvmaze.com/search/shows?q=${textInput}`)
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      //   series = data.series;
      //   console.log(series);
      // input.value = url + ending
      series = data;
      console.log(series);
    });
  //función para que la búsqueda del input resulte en un listado de series
}

button.addEventListener("click", handleConnectTv);

//# sourceMappingURL=main.js.map
