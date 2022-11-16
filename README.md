Visualizador de Pokemon

Proyecto 01 - Hack a Boos Web Dev Bootcamp

Mini aplicación web que debe permitir buscar y visualizar
datos e imágenes de Pokémon.

Se describen a continuación los elementos principales de la aplicación

 + HTML
 	- sección para mostrar información de la búsqueda
 	- sección para mostrar las fichas de los pokemon
 	
 + JS
 	- EVENTO de envío de formulario
		-- formulario.addEventListener("submit", formSubmitHandle);
		
	- FUNCION ENVIO FORMULARIO: gestionar el input del formulario
		-- function formSubmitHandle(e)
		
	- FUNCION CATALOGO: comprobar si el pokemon buscado existe en el catálogo y obtener su url; devuelve unas notas informando sobre el éxito de la busqueda, y si no existe el pokemon buscado tambien devuelve un listado de pokemons q empiezan por la misma letra
		-- async function checkPokemonCatalogo(api, inputUsuario)
		
	- FUNCION DATOS FICHA POKEMON: recupera los datos del pokemon y construye la ficha de informacion
		-- async function getPokemonData(api)
		
	- FUNCION FETCH: obtener datos de la api
		-- async function getApiData(api)
