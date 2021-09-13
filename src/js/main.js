'use strict';

const button = document.querySelector('.js_button');
const givenInput = document.querySelector('.js_input');
const ulList = document.querySelector('.js_ulList');
const ulListFavs = document.querySelector('.js_ulList2');

//variable local que almacena el resultado de la búsqueda de las series introducida en el input de texto
let series = [];
let favorites = [];

//función manejadora del evento click de button.addEventListener para que al hacer click en el botón, la aplicación se conecte a la api de TVMaze
//función que permite hacer una petición al servidor si no tengo datos en el local storage:
function handleConnectTv(ev) {
  //variable que recoge el valor introducido por usuaria
  let textInput = givenInput.value.toLowerCase();

  //1.Realizamos petición de una api al servidor:
  //parámetros a la URL de tipo clave=valor, siempre tras ? y separados por &,
  // p.e. para pedir string con longitud determinada, la url quedaría así https://api.rand.fun/text/password?length=20
  //3. Obtenemos los datos del servidor y lo almacenamos en la variable global series
  fetch(`https://api.tvmaze.com/search/shows?q=${textInput}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      series = data;
      console.log(series);
      //6. Llamamos a la función para que la búsqueda del input resulte en un listado de series con título y cartel (imagen) y las pintamos:
      paintSeries();
      setInLocalStorage();
    });
}

//2.cd presiono botón, se desencadena evento de ir a buscar datos mediante la función handleConnectTv
button.addEventListener('click', handleConnectTv);

//4. Pintamos las series resultado de la búsqueda
//función para que la búsqueda del input resulte en un listado de series con título y cartel (imagen) y lo pinte en la constante global arreglo series =[];
function paintSeries() {
  let html = '';
  //la variable favClass contiene la clase que yo le quiero poner al li
  let favClass = '';
  //verifico que el elemento x el q me estoy paseando es favorito
  //si es favorito,
  for (const serie of series) {
    //otengo lo que me ha devuelto la función que valida si es favorito y lo guardo en la variable isFav. esa constante isFav contiene false or true.
    const isFav = isFavorite(serie);
    //si es favorito, le añado la clase
    if (isFav) {
      favClass = 'main_ulList_container_li_title';
    } else {
      favClass = '';
    }
    //${favClass} es la variable que contiene la clase q aplicamos a serie seleccionada como favorita. añadimos la clase a todos los li y si los marcan como favoritos, la aplica, sino, la pasa vacía
    html += `<li class= 'listItem js_listItem 
    main_ulList_container_li ${favClass}' id='${serie.show.id}'>`;

    console.log(serie.show.name);
    //bucle con if para caso en el que no exista cartel de la serie.
    html += `<div main_ulList_container_li_div>`;
    html += `<h2 class='main_ulList_h2'>${serie.show.name}</h2>`;
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
  //escucha el click sobre cada elemento de la lista
  listenListedSeries();
}

//.8 creamos función para poder hacer clicklables las series mediante un addEventListener.
//creamos una función para poder escuchar en cada una de las series y poder marcarlas con su id si el usuario las elige como favoritas
function listenListedSeries() {
  //selecciono todos los li pintados de la lista
  const listSeries = document.querySelectorAll('.js_listItem');
  //recorro el array de los li para escuchar eventos en cada uno de ellos
  for (const listEl of listSeries) {
    //escucho el evento sobre cada serie de la lista
    listEl.addEventListener('click', handleList);
  }
}

//9. Función que maneja el evento de convertir las series resultado en clickables, y obtener su id al hacer click sobre ella
//función manejadora del evento de escuchar en cada serie y entre ellas elegir una y añadirla a favoritos
function handleList(ev) {
  //obtengo el id de la serie clickada
  const selectedSeries = ev.currentTarget.id;

  console.log(ev.currentTarget.id);
  //busco la serie clickada en el array de series paso una función que tiene como parámetro cada serie
  const clickedItem = series.find((serie) => {
    //el id de la serie corresponde al id del elemento clickado
    //si find no encuentra el elemento devuelve undefined
    return serie.show.id === parseInt(selectedSeries);
  });

  //11. busco si la serie clickada está en el array de favoritos; Si no está, el valor de vuelta será -1, sino, devuelve la posición. busco dentro de mi array de favoritos "favorites". "fav" hace referencia a cada uno de los elementos de del array favorites

  const favoritesFound = favorites.findIndex((fav) => {
    return fav.show.id === parseInt(selectedSeries);
  });

  if (favoritesFound === -1) {
    favorites.push(clickedItem);
  } else {
    favorites.splice(favoritesFound, 1);
  }

  console.log(favorites);
  //función que añade o quita clase según si es o no favorito. está definida más abajo. la llamo cd vez que modifico el array de favoritos
  paintSeries();
  //pinta las favoritas en nueva sección
  printFavoriteList();

  console.log(selectedSeries);
  console.log(favoritesFound);
}

//11. creo una función que verifica si ese li(elemento que quiero pintar es un favorito), me retorna un valor y luego yo le añado la clase. Le pasamos como parámetro cuál es la serie del objeto que quiero ver si es favorito o no(en la función isFavorite)

function isFavorite(serie) {
  //busco si un elemento (fav) se encuentra dentro del array de favorites o no
  const favoriteFound = favorites.find((fav) => {
    //la serie que estoy pansando es favorita?
    return fav.show.id === serie.show.id;
  });
  //si sí es favorita
  if (favoriteFound === undefined) {
    //significa que el elemento no es favorito
    return false;
  } else {
    return true;
  }
  //ese valor de false o true es el que voy a usar dentro del bucle for en la función paintSeries y decido si añado la clase para favoritos o no
}
//14. añadimos la información al localStorage:

function setInLocalStorage() {
  //stringify me permite transformar a string el array de palettes
  const stringSeries = JSON.stringify(favorites);
  //añadimos al localStorage los datos convertidos en string previamente
  localStorage.setItem('favorites', stringSeries);
}

//13. función que nos permite buscar en el localStorage si ya hay info guardada
function getLocalStorage() {
  //obtenemos lo que hay en el LS
  const localStorageSeries = localStorage.getItem('favorites');
  //siempre q cojo datos del localStorage tengo q comprobar si son válidos
  //es decir, si es la primera vez que entro en la pág
  if (localStorageSeries === null) {
    //no tengo datos en el local storage, así q llamo al API con la petición al servidor (la del principio)
    //getFromApi(); así le llama dayana en su ej
    handleConnectTv();
  } else {
    //sí tengo datos en el localStorage, así lo parseo a un array y
    const arrayFavorites = JSON.parse(localStorageSeries);
    //lo guardo en la var global de series
    favorites = arrayFavorites;
    printFavoriteList();
    paintSeries();
  }
}

////////12. función para pintar series en lista de favoritos

function printFavoriteList() {
  let favsHtml = '';
  for (const eachFav of favorites) {
    favsHtml += `<li class= 'listItem js_listItem main_ulList_container_li' id='${eachFav.show.id}'>`;
    favsHtml += `<h2>${eachFav.show.name}</h2>`;
    console.log(eachFav.show.name);
    //bucle con if para caso en el que no exista cartel de la serie.
    favsHtml += `<div main_ulList_container_li_div>`;
    if (eachFav.show.image) {
      favsHtml += `<img src="${eachFav.show.image.original}" class="main_ulList_container_li_img"/>`;
    } else {
      favsHtml += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="image of series" class="main_ulList_container_li_img"/>`;
    }
    favsHtml += `<button id="${eachFav.show.id}" class="js_favButton">X</button>`;
    favsHtml += `</div>`;
    favsHtml += `</li>`;
  }
  console.log(favsHtml);
  ulListFavs.innerHTML = favsHtml;
  //favs son clickables
  makeFavClickable();
  //los datos que me ha dado la API los guardamos en localStorage:
  setInLocalStorage();
  //listenListedSeries();
}
//.15 llamo a la función de almacenamiento
getLocalStorage();

//Eliminar favoritos de la lista de elegidos//////////////
//F1.//función para hacer cada botón clickable mediante un addEVentListener

function makeFavClickable() {
  const favButton = document.querySelectorAll('.js_favButton');
  //selecciono TODOS botones de la sección de favoritos

  for (const eachButton of favButton) {
    //F2.recorro el array de los botones favoritos y escucho evento en CADA uno de ellos
    eachButton.addEventListener('click', handleRemoveFavFromFavsList);
  }
}
//traigo el div que contiene los favoritos
const favDiv = document.querySelector('.js_div2');
// //F3. función manejadora del evento
function handleRemoveFavFromFavsList(ev) {
  let clickedFav = parseInt(ev.currentTarget.id);
  const findClicked = favorites.findIndex(clickedFav);
  favorites.splice();
  console.log(clickedFav);
}
// console.log(clickedFav);
// const searchClickedFav = favorites.find((clickedFav) => {
//   return parseInt(clickedFav.show.id) ===
//   favDiv.innerHTML = '';
//}
// console.log(searchClickedFav);
// if (clickedFav !== null) {
//   clickedFav = '';
// }

//const clickedFav = favorites.find(clickedElement) =>{
//return clickedElement = '';
//}
