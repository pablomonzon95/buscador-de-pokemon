"use strict";
//
///////////////////
/// API pokemon
///////////////////
//
const urlApiLista = "https://pokeapi.co/api/v2/pokemon?limit=1126";
/*  
Esta api es el endpoint de lista completa de pokemons y devuelve un objeto, con 4 propiedades:
  + results: array de objetos que represena un catalogo de pokemons registrados en la api, en el q cada objeto representa un pokemon, con dos propiedades:
    -- name: string; nombre del pokemon
    -- url: string; url a datos específicos de cada pokemon
  + count: num
  + next: url a otros resultados
  + prevoious: null
*/
///////////////////
/// ELEMENTOS HTML
///////////////////
// Selección de elementos html para modificar en función de los resultados
//
// articulo q sirve de contenedor para la ficha de los datos delpokemon buscado
const pokedexArt = document.querySelector('main > article');
// pokedex nombre-titulo del pokemon buscado
const pokedexNombre = document.querySelector('main > article > h2');
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
// Función q recupera los datos del pokemon y construye la ficha de informacion (la pokedex)
//
async function getPokemonData(api) {
  try {
    // llamo a getApiData para obtener los datos
    const apiData = await getApiData(api);
    /* apiData es un objeto con las siguientes propiedades:
      + height: num; valor de altura
      + name: string; nombre
      + weight: num; peso
      + stats: array; 6 elementos tipo objeto que representan una característica: hp, attack, defense, special-atack, special-defense, speed; y tienen la estructura:
        -- base-stat: num; valor
        -- effort: num; ?¿
        -- stat: objeto; compuesto por:
          --- name: string
          --- url
      + types: array; elementos tipo objeto q representa un tipo (1 o más), tienen estructura:
        -- slot: num
        -- type: objeto con dos propiedades
          --- name: string; nombre del tipo
          --- url
     */
    // Desestructuro apiData para extrer los datos de interes de la respuesta
    const { height, name, weight, stats, types, sprites } = apiData;

    // Traduccion de las propiedades estadisticas a castellano
    for(let object of stats) {
      switch (object["stat"]["name"]) {
        case "hp":
          object["stat"]["name"] = "Puntos de vida";
          break;
        case "attack":
          object["stat"]["name"] = "Ataque";
          break;
        case "defense":
          object["stat"]["name"] = "Defensa";
          break;
        case "special-attack":
          object["stat"]["name"] = "Ataque especial";
          break;
      case "special-defense":
          object["stat"]["name"] = "Defensa especial";
          break;
      case "speed":
          object["stat"]["name"] = "Velocidad";
          break;
      default:
        object["stat"]["name"] = "Habilidad desconocida";
      }
    }
    // CONSTRUCCION DE LA FICHA DE DATOS DEL POKEMON: la creo a trozos, y luego la añado al html
    // crear fragmento-ficha a añadir
      const fragPokedex = document.createDocumentFragment();
      
      // titulo de la ficha: nombre del pokemon
        // crear elemento
      const pokedexTitulo = document.createElement('h3');
        // añadir contenido al elemento
      pokedexTitulo.innerHTML = `${name}`;
        // añadie elemento al fragmento-ficha
      fragPokedex.append(pokedexTitulo);
      
      // imagenes de la ficha
      const pokedexImagenes = document.createElement('figure');
      pokedexImagenes.innerHTML =
        `<img id='imgFrontal' src="${sprites["front_default"]}" alt="imagen frontal del pokemon" />
        <img id='imgTrasera' src="${sprites["back_default"]}" alt="imagen trasera del pokemon" />`;
      fragPokedex.append(pokedexImagenes);

      // enunciado de la lista de atributos
        // crear elemento
      const pokedexListaTitulo = document.createElement('h4');
        // añadir contenido al elemento
      pokedexListaTitulo.innerHTML = `Atributos del pokemon ${name}:`;
        // añadie elemento al fragmento-ficha
      fragPokedex.append(pokedexListaTitulo);
      
      // lista de atributos
        // crear elemento
      const pokedexLista = document.createElement('ul');

        // por cada elemento-atributo del array stats
      for (let atributo of stats) {
        // crear item de la lista de atributos
        const pokedexListaItem = document.createElement('li');
        // añadir contenido al elemento
        pokedexListaItem.textContent = `${atributo["stat"]["name"]}: ${atributo["base_stat"]}`
        // añadir elemento a la lista
        pokedexLista.append(pokedexListaItem);
      }
      // por cada elemento-tipo en el array de types
      for (let tipo of types) {
        // crear item de la lista de atributos
        const pokedexListaItem = document.createElement('li');
        // añadir contenido al elemento
        pokedexListaItem.textContent = `Tipo ${tipo["slot"]}: ${tipo["type"]["name"]}`
        // añadir elemento a la lista
        pokedexLista.append(pokedexListaItem);
      }
      // añadir lista de atributos al fragmento
      fragPokedex.append(pokedexLista);
      // añadir ficha de datos al HTML
      document.querySelector('#pokedex-fichas').append(fragPokedex);
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
//
// Funcion para comprobar si el pokemon buscado existe en el catálogo y obtener su url; si no existe devuelve un listado de pokemons q empiezan por la misma letra que el input del usuario
//
async function checkPokemonCatalogo(api, inputUsuario) {

  // pasar a minusculas el input del usuario, por si escribe con mayusculas
  const pokemonBuscado = inputUsuario.toLowerCase();

  try {
    // preparar html: crear elementos a inyectar en preInfo

    // preInfo a la ficha
        // crear fragmento
        const fragPreInfo = document.createDocumentFragment();

        // imagen preInfo
        const preInfoImagen = document.createElement('figure');

        // titulo preInfo
        const preInfoTitulo = document.createElement('h2');

        // aviso preInfo
        const preInfoAviso = document.createElement('h3');


    // llamo a getApiData para obtener los datos
    const apiData = await getApiData(api);
    /* 
    apiData es un objeto con 4 propiedades, de la q solo nos interesa "results"
     + results: array; catálogo de pokemons que existe en la api; sus elementos son:
     objetos q representan el registro de un pokemon, de propiedades:
      -- name: string: nombre del pokemon
      -- url: string; url a los datos del pokemon
    */
    // extraer de los datos de la api el array "results" y desechar el resto;
    const { results } = apiData;

    // filtro results para ver si existe un pokemon de mismo nombre que pokemonBuscado
      // creo un array registroPokemonBuscado
      // el filtro solo deja pasar al elemento si la pokemonBuscado está contenido en su propiedad "name"
      let registroPokemonBuscado = results.filter((pokemon) => {
        if (pokemon["name"].indexOf(pokemonBuscado) !== -1) {
          return pokemon;
        } 
    });
    /*  
    según pokemonBuscado exista o no en el catálogo de la api (array results) registroPokemonBuscado será:
      + si no existe: un array vacio
      + si sí existe: un array que contiene los registros de los pokemon q contienen ese nombre
    */
    /* 
    ++++++++++++++++++++++++++++++
    ++ si NO existe pokemonBuscado
    ++++++++++++++++++++++++++++++
    */
    if (registroPokemonBuscado.length === 0) {
      // buscar pokemons de nombre similar
        // creo un array similaresPokemonBuscado
          // el filtro solo deja pasar elementos si su propiedad "name" empieza por la misma letra que pokemonBuscado
      let similaresPokemonBuscado = results.filter((pokemon) => {
        if (pokemon["name"][0] === pokemonBuscado[0]) {
          return pokemon;
        } 
    });
      /*
      ------------------------
      -- Modificación del HTML
      ------------------------
      */
      // imagen preInfo
      preInfoImagen.innerHTML = `<img id='imgFrontal' src="./img/no-pokemon.gif" alt="no existe ese pokemon" />`;
      fragPreInfo.append(preInfoImagen);

      // notas preInfo
      preInfoTitulo.innerHTML = `No existe ningún pokemon con el nombre "${pokemonBuscado}". Quizás buscas alguno de los siguientes.`;
      fragPreInfo.append(preInfoTitulo);
      
      // lista similaresPokemonBuscado
      const preInfoListaSimilares = document.createElement('ul');
      // crear subfragmento a añadir
      const fragSimilares = document.createDocumentFragment();
      for (let pokemon of similaresPokemonBuscado) {
        // crear el elemento a añadir en cada ciclo
        const pokemonSimilar = document.createElement('li');
        // añadir contenido a cada li
        pokemonSimilar.innerHTML = `${pokemon.name}`;
        // añadir al fragmento
        fragSimilares.append(pokemonSimilar);        
      }
      // añadir fragSimilares a lista
      preInfoListaSimilares.append(fragSimilares);
      // añadir lista a fragPreInfo
      fragPreInfo.append(preInfoListaSimilares);

      // añadir fragPreInfo a seleccion
      document.querySelector('#pokedex-preInfo').append(fragPreInfo);
    }
    /* 
    ++++++++++++++++++++++++++++++
    ++ si SÍ existe inequívocamente pokemonBuscado
    ++++++++++++++++++++++++++++++
    */
    else if (registroPokemonBuscado.length === 1) {
      /*
      ------------------------
      -- Modificación del HTML
      ------------------------
      */
      // imagen preInfo
      preInfoImagen.innerHTML = `<img id='imgFrontal' src="./img/poke-ball" alt="imagen de una pokeball" />`;
      fragPreInfo.append(preInfoImagen);

      // notas preInfo
      preInfoTitulo.innerHTML = `El pokemon "${pokemonBuscado}" está registrado. Esta es su ficha de datos.`;
      fragPreInfo.append(preInfoTitulo);

      // añadir fragPreInfo a seleccion
      document.querySelector('#pokedex-preInfo').append(fragPreInfo);

      // llamada para obtener datos del pokemonBuscado
      getPokemonData(registroPokemonBuscado[0]["url"]);
    }
    /*
    ++++++++++++++++++++++++++++++
    ++ si SÍ existe, pero existen más de 1 pokemon con pokemonBuscado en el nombre:
    ++++++++++++++++++++++++++++++
    */
    else {
      /*
      ------------------------
      -- Modificación del HTML
      ------------------------
      */
      // pokedex - preInfo

      // imagen preInfo
      preInfoImagen.innerHTML = `<img id='imgFrontal' src="./img/no-pokemon.gif" alt="hay varios pokemon con ese nombre" />`;
      fragPreInfo.append(preInfoImagen);

      // notas preInfo
      preInfoTitulo.innerHTML = `Existen varios pokemon de nombre "${pokemonBuscado}". Estas son sus fichas de datos.`;
      fragPreInfo.append(preInfoTitulo);

      // añadir fragPreInfo a seleccion
      document.querySelector('#pokedex-preInfo').append(fragPreInfo);
      
      // llamo a la función para crear la ficha de datos tantas veces como pokemons de mismo nombre
      for (let pokemon of registroPokemonBuscado) {
        getPokemonData(pokemon["url"]);
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
//
///////////////////////
//// FUNCION ENVIO FORMULARIO
///////////////////////
function formSubmitHandle(e) {
  // evitar recarga de pagina tras enviar
  e.preventDefault();

    /* 
    ++++++++++++++++++++++++++++++
    ++ Limpiar el html entre busqedas
    ++++++++++++++++++++++++++++++
  */

  // crear objeto FormData con el input cuadno se envia
  const dataFormulario = new FormData(formulario);

  //desestructurar dataFormulario
    // creo un string vacio para meter despues el valor del input q introduzca el usuario
  let pokemonBuscado = "";

    // para cada array del objeto dataForm (en este caso 1 solo por 1 solo input (pokedex))
  for (let campo of dataFormulario) {
    const [nameInput, valueInput] = campo;
    pokemonBuscado = valueInput;
  }
  
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