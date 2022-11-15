"use strict";

///////////////////
/// API pokemon
///////////////////
//
// endpoint de lista completa de pokemon
const urlApiLista = "https://pokeapi.co/api/v2/pokemon?limit=1126";
// esta api devuelve un objeto, con 4 propiedades:
// results: array de objetos; (catalogo de pokemons registrados en la api) en los q cada objeto es un pokemon, con dos propiedades:
  //  name: string; nombre del pokemon
  //  url: string; url a datos específicos de cada pokemon
// count: num
// next: url a otros resultados
// prevuous. null

/* ///////////////////
/// ELEMENTOS HTML: seleccion de elemetnos html para modificar en función de los resultados
///////////////////
//
// articulo q sirve de pokedex para contener los datos delpokemon buscado
const pokedexArt = document.querySelector('main > article');
  // pokedex nombre-titulo del pokemon buscado
const pokedexNombre = document.querySelector('main > article > h2'); */

//
///////////////////////
//// FUNCION FETCH
///////////////////////
async function getApiData(api) {
  try {
    // hacer fetch
    const response = await fetch(api);
    // gestionar respuesta y debvolver datos
    const apiResponse = await response.json();
    return apiResponse;
  }
  catch (error) {
    console.error(error);
  }
}
//
///////////////////////
//// FUNCION DATOS FICHA POKEMON
///////////////////////
async function getPokemonData(api) {
  try {
    // llamo a getApiData para obtener los datos
    const apiData = await getApiData(api);
    // apiData será un objeto del que nos interesa extraer: nombre, altura, peso, puntos de vida, ataque, defensa, velocidad y tipos a los que pertenece

    // Desestructuro apiData para extrer los datos de interes de la respuesta
    const { height, name, weight, stats, types, sprites } = apiData;
    // height: num; valor de altura
    // name: string; nombre
    // weight: num; peso
    // stats: array; de 6 elementos tipo objeto; cada objeto representa una característica: hp, attack, defense, special-atack, special-defense, speed; y tienen la estructura:
      // base-stat: num; valor
      // effort: num; ?¿
      // stat: objeto; compuesto por:
        // name: string
        //url
    // types: array; de elementos tipo objeto; cada objeto representa un tipo al que pertence el pokemon (1 o más), tienen estructura:
      // slot: num
      // type: objeto con dos propiedades
        // name: string; nombre del tipo
        // url

    // test
    console.log(`TEST - nombre: ${name}`);
    // test
    console.log(`TEST - altura: ${height}`);
    // test
    console.log(`TEST - peso: ${weight}`);

    // por cada elemento-tipo en el array de types
    for (let tipo of types) {
      // test
      console.log(`TEST - tipo ${tipo["slot"]}: ${tipo["type"]["name"]}`);
    }

    // por cada elemento-stat en el array de stats
    for (let atributo of stats) {
      // test
      console.log(
        `TEST - El atributo ${atributo["stat"]["name"]} tiene un valor de ${atributo["base_stat"]}`
      );
    }

    // las imagenes
    // test
    console.log(`TEST - su foto frontal está en: ${sprites["front_default"]}`);
    // test
    console.log(`TEST - su foto trasera está en: ${sprites["back_default"]}`);
    
    ////////////////////////
    // Modificación del HTML en caso de que se encuentre el pokemonBuscado
    ////////////////////////

    // pokedex - titulo - nombre del pokemon
    document.querySelector('main > article > h2').textContent = `${name}`;

    // pokedex - imagenes
    document.querySelector('main > article > figure').innerHTML = `<img id='imgFrontal' src="${sprites["front_default"]}" alt="imagen frontal del pokemon" /> <img id='imgTrasera' src="${sprites["back_default"]}" alt="imagen trasera del pokemon" />` ;

  }
  // gestion en caso de error
  catch (error) {
    console.error(error);
  }
}
//
///////////////////////
//// FUNCION CATALOGO
///////////////////////
// funcion para comprobar el catálogo de pokemon y obtener url del pokemon buscado
async function checkPokemonCatalogo(api, inputUsuario) {
  // pasar a minusculas el input del usuario, por si esqcribe con mayus
  const pokemonBuscado = inputUsuario.toLowerCase();

  try {
    // llamo a getApiData para obtener los datos
    const apiData = await getApiData(api);

    // extraer de los datos de la api el array "results" y desechar el resto;
    const { results } = apiData;
      // results es un array; el catálogo de pokemons que existe en la api; sus elementos son objetos con dos propiedades "name" y "url"

    // filtro results para ver si existe un pokemon de mismo nombre que pokemonBuscado
      // creo un array registroPokemonBuscado con un filtro que solo deja pasar al elemento si la propiedad name es igual a pokemonBuscado
      let registroPokemonBuscado = results.filter((pokemon) => {
        if (pokemon["name"].indexOf(pokemonBuscado) !== -1) {
          return pokemon;
        } 
    });
      // registroPokemonBuscado es un array que según exista o no pokemonBuscado en el catálogo de la api (array results) es:
        // si no existe pokemonBuscado es un array vacio
        // si sí existe pokemonBuscado es un array que contiene un único objeto, de propiedades "name" y "url"
    // test
    console.log(`TEST - registroPokemonBuscado en siguiente linea`);
    // test
    console.log(registroPokemonBuscado);
    ////////////////////////
    // Comprobación existencia pokemonBuscado
    ////////////////////////
    // compruebo si pokemonBuscado NO existe en el catálogo de la API (caso que registroPokemonBuscado está vacio)
    // si NO existe pokemonBuscado
    if (registroPokemonBuscado.length === 0) {
      // test
      console.log(`TEST - No existe ningún pokemon con el nombre ${pokemonBuscado}`);
      
      // si NO existe pokemonBuscado buscar pokemons de nombre similar
      // creo un array similaresPokemonBuscado con un filtro que solo deja pasar los elementos si la propiedad name empieza por la misma letra que pokemonBuscado
      let similaresPokemonBuscado = results.filter((pokemon) => {
        if (pokemon["name"][0] === pokemonBuscado[0]) {
          return pokemon;
        } 
    });

      // test
      console.log(`TEST - Quizás buscabas alguno de los siguientes:`);
      // test
      console.log(similaresPokemonBuscado);

      ////////////////////////
      // Modificación del HTML en caso de que NO se encuentre el pokemonBuscado
      ////////////////////////

      // pokedex - titulo - nombre del pokemon
      document.querySelector('main > article > h2').textContent = `No existe ningún pokemon con el nombre ${pokemonBuscado}`;

      // pokedex - imagenes
      document.querySelector('main > article > figure').innerHTML = `<img id='imgFrontal' src="./img/no-pokemon.gif" alt="imagen frontal del pokemon" />`;

      // pokedex - section titulo
      document.querySelector('main > article > section > h3').textContent = `Quizás buscabas alguno de los siguientes:`;

      // pokedex - lista similaresPokemonBuscado
        // crear fragmento a añadir
      const fragSimilares = document.createDocumentFragment();
      for (let nombre of similaresPokemonBuscado) {
        // crear el elemento a añadir en cada ciclo
        const li = document.createElement('li');
        // añadir contenido a cada li
        li.innerHTML = `${nombre.name}`;
        // añadir al fragmento
        fragSimilares.append(li);
        // añadir a la lista ul
        document.querySelector('main > article > section > ul').append(fragSimilares);
      }
    }
    // si SÍ existe inequívocamente pokemonBuscado (registroPokemonBuscado no vacio)
    else if (registroPokemonBuscado.length === 1) {
      // test
      console.log(`TEST - El pokemon buscado, ${pokemonBuscado}, existe y su info está disponible en: ${registroPokemonBuscado[0]["url"]}.`)
      // test
      console.log(`TEST - Llamando a getPokemonData con parámetro ${registroPokemonBuscado[0]["url"]}`);
      // llamada para obtener datos del pokemonBuscado
      getPokemonData(registroPokemonBuscado[0]["url"]);
    }
    // si SÍ existe, pero existen más de 1 pokemon con pokemonBuscado en el nombre:
    else {
      console.log(`TEST - hay varios pokemons con ese nombre`)
      ////////////////////////
      // Modificación del HTML en caso de que Sï se ecuentren varios pokemons
      ////////////////////////

      // pokedex - titulo - nombre del pokemon
      document.querySelector('main > article > h2').textContent = `Existen varios pokemon cuyo nombre contiene ${pokemonBuscado}`;

      // pokedex - imagenes
      document.querySelector('main > article > figure').innerHTML = `<img id='imgFrontal' src="./img/pokemon-repetido.jpg" alt="imagen frontal del pokemon" />`;

      // pokedex - section titulo
      document.querySelector('main > article > section > h3').textContent = `Quizás buscabas alguno de los siguientes:`;

      // pokedex - lista similaresPokemonBuscado
        // crear fragmento a añadir
      const fragSimilares = document.createDocumentFragment();
      for (let pokemon of registroPokemonBuscado) {
        // crear el elemento a añadir en cada ciclo
        const li = document.createElement('li');
        // añadir contenido a cada li
        li.innerHTML = `${pokemon.name}`;
        // añadir al fragmento
        fragSimilares.append(li);
        // añadir a la lista ul
        document.querySelector('main > article > section > ul').append(fragSimilares);
      }
    }
  }
  // gestion en caso de error
  catch (error) {
    console.error(error);
  }
}
// seleccion del formulario
const formulario = document.forms.formulario;
//test
console.log(formulario);
//
///////////////////////
//// FUNCION ENVIO FORMULARIO
///////////////////////
function formSubmitHandle(e) {
  // evitar recarga de pagina tras enviar
  e.preventDefault();
  //test
  console.log("TEST - Formulario enviado");

  // crear objeto FormData con el input cuadno se envia
  const dataFormulario = new FormData(formulario);
  // test
  console.log("TEST console.log(dataFormulario) en la siguiente linea");
  // test
  console.log(dataFormulario);

  //desestructurar dataFormulario
    // creo un string vacio para meter despues el valor del input q introduzca el usuario
  let pokemonBuscado = "";

    // para cada array del objeto dataForm (en este caso 1 solo por 1 solo input (pokedex))
  for (let campo of dataFormulario) {
    const [nameInput, valueInput] = campo;
    // test
    console.log(`TEST - nameInput es ${nameInput}`);
    // test
    console.log(`TEST - valueInput es ${valueInput}`);
    pokemonBuscado = valueInput;
  }
  //test
  console.log(`TEST - El pokemon buscado es ${pokemonBuscado}`);
  
  // test
  console.log(`TEST - Llamando a checkPokemonCatalogo(urlApiLista, pokemonBuscado) con parámetros ${urlApiLista} y ${pokemonBuscado}`);
  // llamar a la funcion de comprobacion de catalogo de pokemon
  checkPokemonCatalogo(urlApiLista, pokemonBuscado);

  // limpiar formulario tras envio
  formulario.reset();
}
//
///////////////////////
//// EVENTO ENVIO FORMULARIO
///////////////////////
// evento de escucha para el envio del formulario
formulario.addEventListener("submit", formSubmitHandle);
