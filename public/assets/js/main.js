"use strict";

const button = document.querySelector(".js_button");
const givenInput = document.querySelector(".js_input");
const ulList = document.querySelector(".js_ulList");

//variable local que almacena el resultado de la búsqueda de las series introducida en el input de texto
let series = [];
let favorites = [];

//función manejadora del evento click de button.addEventListener para que al hacer click en el botón, la aplicación se conecte a la api de TVMaze
function handleConnectTv(ev) {
  //variable que recoge el valor introducido por usuaria
  let textInput = givenInput.value;
  //parámetros a la URL de tipo clave=valor, siempre tras ? y separados por &,
  // p.e. para pedir string con longitud determinada, la url quedaría así https://api.rand.fun/text/password?length=20

  fetch(`https://api.tvmaze.com/search/shows?q=${textInput}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      series = data;
      console.log(series);
      //función para que la búsqueda del input resulte en un listado de series con título y cartel (imagen)
      paintSeries();
    });
}

button.addEventListener("click", handleConnectTv);

//función para que la búsqueda del input resulte en un listado de series con título y cartel (imagen) y lo pinte en la constante global arreglo series =[];
function paintSeries() {
  let html = "";
  for (const serie of series) {
    html += `<li class= 'listItem js_listItem' id='${serie.show.id}'>`;
    html += `<h2>${serie.show.name}</h2>`;
    console.log(serie.show.name);
    //bucle con if para caso en el que no exista cartel de la serie.
    //habrá que subir la img al proyecto.
    html += `<div main_ulList_container_li_div>`;
    if (serie.show.image) {
      html += `<img src="${serie.show.image.original}" class="main_ulList_container_li_img"/>`;
    } else {
      html += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="image of series" class="main_ulList_container_li_img">`;
    }
    html += `</div>`;
    html += `</li>`;
  }
  ulList.innerHTML = html;
  console.log(html);
  listenListedSeries();
}

//creamos una función para poder escuchar en cada una de las series y poder marcarlas con su id si el usuario las elige como favoritas
function listenListedSeries() {
  //selecciono todos los li pintados de la lista
  const listSeries = document.querySelectorAll(".js_listItem");
  //recorro el array de los li para escuchar eventos en cada uno de ellos
  for (const listEl of listSeries) {
    //escucho el evento sobre cada serie de la lista
    listEl.addEventListener("click", handleList);
  }
}

//función manejadora del evento de escuchar en cada serie y entre ellas elegir una y añadirla a favoritos
function handleList(ev) {
  //obtengo el id de la serie clickada
  const selectedSeries = ev.currentTarget.id;
  const selectedItem = ev.currentTarget;
  selectedItem.classList.toggle("main_ulList_container_li_title");
  console.log(ev.currentTarget.id);
  //busco la serie clickada en el array de series paso una función que tiene como parámetro cada serie
  const clickedItem = series.find((serie) => {
    //el id de la serie corresponde al id del elemento clickado
    return serie.show.id === parseInt(selectedSeries);
  });
  console.log(clickedItem);

  //busco si la serie clickada está en el array de favoritos;
  //   const favoritesFound = favorites.findIndex((fav) => {
  //     return fav.id === clickedSeries;
  //   });
}

//# sourceMappingURL=main.js.map
