import { writable } from "svelte/store";
import games from "$lib/data/games.json";

const activeGenre = undefined; 
const genreList = [];

games.data.forEach(element => {
    element.genres.forEach(genre => {
        if(!genreList.includes(genre)){
            genreList.push(genre);
        }
    });
});

const genresStore = writable({ activeGenre, genreList });

export default genresStore;