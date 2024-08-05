import {
    IResponseRickMorty,
    Result
} from "./interfaces/interfaces-rickmorty"; // Importamos las interfaces

const ul = document.querySelector('ul') as HTMLUListElement; // Seleccionamos el elemento ul del HTML
const namefilter = document.querySelector('input') as HTMLInputElement; // Seleccionamos el elemento input del HTML


// Función que se ejecuta cuando el documento ha sido cargado
document.addEventListener('DOMContentLoaded', async () => {
    const data: Result[] = await getAllCharacters(); // Obtenemos los personajes de la API  

    //funcion para filtrar por nombre
    function filterByName(character: Result[], name:string) { 
        const lowerCaseName = name.toLowerCase(); // Convertimos el nombre a minúsculas
        return character.filter(character => character.name.toLocaleLowerCase().includes(lowerCaseName)); // Filtramos los personajes cuyo nombre incluya el nombre introducido
    }

    //evento para filtar por nombre en el input
    namefilter.addEventListener('input', (e)=>{
        const filteredCharacters = filterByName(data, (e.target as HTMLInputElement).value); // Filtramos los personajes
        ul.innerHTML = ''; // Limpiamos la lista
        renderCharacters(filteredCharacters); // Renderizamos los personajes filtrados
    })

    renderCharacters(data); // Renderizamos todos los personajes

    //funcion para crear los elementos de la lista
    function renderCharacters(characters: Result[]) {

        //recorremos los personajes
        characters.forEach((character: Result) =>{

            //creamos los elementos de la lista
            const li = document.createElement('li');
            const name = document.createElement('h4');
            const image = document.createElement('img');
            const status = document.createElement('p');
            const specie = document.createElement('p');
            const gender = document.createElement('p');
            const origin = document.createElement('p');
            const location = document.createElement('p');


            //añadimos los valores a los elementos
            name.innerText = character.name;
            image.src = character.image;
            image.alt = character.name;
            status.innerText = `Status: ${character.status}`;
            specie.innerText = `Specie: ${character.species}`;
            gender.innerText = `Gender: ${character.gender}`;
            origin.innerText = `Origin: ${character.origin.name}`;
            location.innerText = `Location: ${character.location.name}`;

            //añadimos los elementos a la lista
            li.append(name);
            li.append(image);
            li.append(status);
            li.append(specie);
            li.append(gender);
            li.append(origin);
            li.append(location);

            //añadimos la lista al ul
            ul.appendChild(li);
        });
    };
});


// Función que obtiene todos los personajes de la API
const getAllCharacters = async (): Promise<Result[]> => {
    try {
        const response = await fetch("https://rickandmortyapi.com/api/character");
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }
        const data: IResponseRickMorty = await response.json();
        console.log("API Data:", data.results); // Log the data for debugging
        return data.results;
    } catch (error) {
        console.error("Failed to fetch characters:", error);
        return []; // Return an empty array or handle the error as appropriate
    }
};