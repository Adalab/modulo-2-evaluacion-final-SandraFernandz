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
  let favClass = "";
  //verifico que el elemento x el q me estoy paseando es favorito
  //si es favorito,
  for (const serie of series) {
    const isFav = isFavorite(serie);
    //si es favorito, le añado la clase
    if (isFav) {
      favClass = "main_ulList_container_li_title";
    } else {
      favClass = "";
    }
    html += `<li class= 'listItem js_listItem ${favClass}' id='${serie.show.id}'>`;
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
  //quizá haya que comentarlo después ???????????????????????????
  //ev.currentTarget.classList.toggle("main_ulList_container_li_title");

  console.log(ev.currentTarget.id);
  //busco la serie clickada en el array de series paso una función que tiene como parámetro cada serie
  const clickedItem = series.find((serie) => {
    //el id de la serie corresponde al id del elemento clickado
    return serie.show.id === parseInt(selectedSeries);
  });

  //busco si la serie clickada está en el array de favoritos; Si no está, el valor de vuelta será -1, sino devuelve la posición. busco dentro de mi array de favoritos "favorites". "fav" hace referencia a cada uno de los elementos de del array favorites

  const favoritesFound = favorites.findIndex((fav) => {
    return fav.show.id === parseInt(selectedSeries);
  });

  if (favoritesFound === -1) {
    favorites.push(clickedItem);
  } else {
    favorites.splice(favoritesFound, 1);
  }

  console.log(favorites);
  //función que añade o quita clase según si es o no favorito. está definida más abajo.
  paintSeries();
  console.log(selectedSeries);
  console.log(favoritesFound);
}

//creo una función que verifica si ese li(elemento que quiero pintar es un favorito), me retorna un valor y luego yo le añado la clase. Le pasamos como parámetro cuál es la serie del objeto que quiero ver si es favorito o no(en la función isFavorite)

function isFavorite(serie) {
  const favoriteFound = favorites.find((fav) => {
    return fav.show.id === serie.show.id;
  });
  if (favoriteFound === undefined) {
    return false;
  } else {
    return true;
  }
}

//# sourceMappingURL=main.js.map
