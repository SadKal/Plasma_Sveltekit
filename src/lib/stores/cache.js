import { writable } from 'svelte/store';
import games from '$lib/data/games.json';
import { goto } from "$app/navigation";
//import shopGameStore from '$stores/shopGame';

let gamesData = [];

let randomIndex;
let randomObject; 
let i=0;

while(i<10){
    //Saco un indice aleatorio y un objeto aleatorio del json
    randomIndex = Math.floor(Math.random() * games.data.length);
    randomObject = games.data[randomIndex];
    //Sigo sacando hasta que encuentro uno que no esté en el array
    if(!gamesData.includes(randomObject)){
        gamesData.push(randomObject);
        i++;
    };
};

function showSlides(n) {
    cacheStore.update ((data => {

        if (n==0){
            let shopGame = gamesData.find((game) => game.image==slides.center.source);
            goto(`/game/${shopGame.id}`);
        };

        const border = n === +1 ? 0 : gamesData.length-1
        //Por cada slide, actualizamos el indice de gamesData y la imagen a mostrar
        Object.values(data.slides).forEach(element => {
            element.index = (gamesData[element.index+n]==null ? border : element.index+n);
            element.source = gamesData[element.index].image;
        });
        return data;

    }));
};

const cache=[];

const slides={
    left:{
        source: gamesData[0].image,
        index: 0,
        position:'--side',
    },
    center:{
        source: gamesData[1].image,
        index: 1,
        position:'--center',
    },
    right:{
        source: gamesData[2].image,
        index: 2,
        position:'--side',
    }
};
const cacheStore = writable({slides, cache, gamesData, showSlides});

export default cacheStore;