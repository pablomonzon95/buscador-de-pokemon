'use strict';

// API -url : endpoint de lista completa de pokemon
const urlApiLista = 'https://pokeapi.co/api/v2/pokemon?limit=1126';
// esta api devuelve un objeto, con 4 propiedades:
            // results: array de objetos, en los q cada objeto es un pokemon, con dos propiedades:
                // name: string; nombre del pokemon
                // url: string-; url a datos específicos del pokemon
            // count: num
            // next: url a otros resultados
            //prevuous. null

// funcion de fetch
async function getApiData(api) {
    try {
        // hacer fetch
        const response = await fetch(api);

        // gestionar respuesta y debvolver datos
        const apiData = await response.json();
        return apiData;
    } catch (error) {
        console.error(error);
    }
}

// funcion para obtener array con lista completa de pokemons
async function getPokemonList(api) {
    try {
        // llamo a getApiData para obtener los datos
        const apiData = await getApiData(api);

        // extraer de los datos de la api el array "results" y desechar el resto
        const {results} = apiData;
        return results
    } catch (error) {
        console.error(error);
    }
}

getPokemonList(urlApiLista);
//test
console.log(getPokemonList(urlApiLista));

// seleccion de elementos del html
const input = document.querySelector("#buscador-pokemon");
const boton = document.querySelector("#boton");
const form = document.querySelector("#formulario");
const articulo = document.querySelector("#articulo");

