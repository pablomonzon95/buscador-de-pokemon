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
        const {PromiseResult} = apiData;
        return PromiseResult
    } catch (error) {
        console.error(error);
    }
}

const lista = getPokemonList(urlApiLista);
//test
console.log(getPokemonList(urlApiLista));
console.log(lista);

// seleccion de elementos del html
const form = document.querySelector("#formulario");
const input = document.querySelector("#buscador-pokemon");
const boton = document.querySelector("#boton");
const articulo = document.querySelector("#articulo");

// formDATA
function formSubmitHandle(e) {
    // Evitar recarga de pagina (comportamiento por defecto de evento submit)
    e.preventDefault();
        // test
    console.log('formulario enviado');
  
    // Crear objeto clase FormData con los datos de los input cuando envia formulario
    const data = new FormData(form);
  
    // Recorremos data para mostrar cada uno de sus valores
    for (const pokemon of data) {
      // elemento es un array, lo podemos destructurar
      const [nameInput, valueInput] = pokemon;
      console.log(valueInput);
  
        // Para el input nombre mostramos un console.log distinto
    if (nameInput === 'pokedex') {
        console.log(`El valor del input de nombre es ${valueInput}`);
      }
      // si el valueInput existe en el array results hacer nuevo fetch
      for (element of PromiseResult) {
        if (valueInput === results.name) {
            console.log("El pokemon buscado no existe´");
          }
        else {
            console.log(`El pokemon buscado existe y es ${results.name}`);
          }
      }
    
    }
  
    

    // Al final limpiar el formulario
    form.reset();
}

  // Asignamos al formulario esta funcion manejadora del evento de submit
  form.addEventListener('submit', formSubmitHandle);