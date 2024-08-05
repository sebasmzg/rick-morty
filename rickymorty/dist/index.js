"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//Object.defineProperty(exports, "__esModule", { value: true });
const ul = document.querySelector('ul'); // Seleccionamos el elemento ul del HTML
const namefilter = document.querySelector('input'); // Seleccionamos el elemento input del HTML
const statusfilter = document.querySelector('select'); // Seleccionamos el elemento select del HTML
// Función que se ejecuta cuando el documento ha sido cargado
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getAllCharacters(); // Obtenemos los personajes de la API  
    //funcion para filtrar por nombre
    function filterByName(character, name) {
        const lowerCaseName = name.toLowerCase(); // Convertimos el nombre a minúsculas
        return character.filter(character => character.name.toLocaleLowerCase().includes(lowerCaseName)); // Filtramos los personajes cuyo nombre incluya el nombre introducido
    }
    //evento para filtar por nombre en el input
    namefilter.addEventListener('input', (e) => {
        const filteredCharacters = filterByName(data, e.target.value); // Filtramos los personajes
        ul.innerHTML = ''; // Limpiamos la lista
        renderCharacters(filteredCharacters); // Renderizamos los personajes filtrados
    });
    renderCharacters(data); // Renderizamos todos los personajes
    //funcion para crear los elementos de la lista
    function renderCharacters(characters) {
        //recorremos los personajes
        characters.forEach((character) => {
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
    }
    ;
}));
// Función que obtiene todos los personajes de la API
const getAllCharacters = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("https://rickandmortyapi.com/api/character");
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }
        const data = yield response.json();
        console.log("API Data:", data.results); // Log the data for debugging
        return data.results;
    }
    catch (error) {
        console.error("Failed to fetch characters:", error);
        return []; // Return an empty array or handle the error as appropriate
    }
});
