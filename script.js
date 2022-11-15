'use strict';



  // Asignamos al formulario esta funcion manejadora del evento de submit
  form.addEventListener('submit', formSubmitHandle);*/
  const urlApiLista = "https://pokeapi.co/api/v2/pokemon?limit=1126";
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
    const apiResponse = await response.json();
    return apiResponse;
  } catch (error) {
    console.error(error);
  }
}

// creo un array vacio para meter los datos de results; la defino fuera de cq funcion
const listaPokemon = [];

// funcion para obtener array con lista completa de pokemons
async function getPokemonList(api) {
  try {
    // llamo a getApiData para obtener los datos
    const apiData = await getApiData(api);

    // extraer de los datos de la api el array "results" y desechar el resto
    const { results } = apiData;

    // meto a cada pokemon en la listaPokemon
    for (const pokemon of results) {
      listaPokemon.push(pokemon);
    }

    localStorage.setItem("listaPokemon", JSON.stringify(listaPokemon));

    //for (const pokemon of listaPokemon) {
     // console.log(`Soy ${pokemon.name} y mi info está en ${pokemon.url}`);
    //}
  } catch(error) {
    console.error(error);
  }
}


getPokemonList(urlApiLista);

//recupero los datos como un array puro; catalogoPokemon es un array de objetos accesible
const catalogoPokemon = JSON.parse(localStorage.getItem("listaPokemon"));
console.log(catalogoPokemon)

// para cada pokemon dentro del catálogo comprobar si existe uno con el mismo nombre q el del input
for (let pokemon of catalogoPokemon) {
    if(pokemon.name === input) {
        console.log(`La info de ${pokemon.name} se puede ver en ${pokemon.url}`)
        // si encuentra uno con ese nombre exacto interrumpir la comprbación
        break;
    } else {
        console.log(`Lo sentimos, no conocemos ningún pokemon de nombre ${input}.`)
    }
} */
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
    for (const elemento of data) {
      // elemento es un array, lo podemos destructurar
      const [nameInput, valueInput] = elemento;
      console.log(valueInput);
     for(let pokemon of catalogoPokemon) {
        if(valueInput === pokemon.name){
            console.log(`Has seleccionado a ${valueInput}`)
            break;
        } 
        }
     }  
    
  
    
    
  
    

    // Al final limpiar el formulario
    form.reset();
}
form.addEventListener('submit', formSubmitHandle);