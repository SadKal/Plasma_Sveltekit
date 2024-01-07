import { writable } from 'svelte/store';
import { goto } from "$app/navigation";

let gamesData = [];

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
        source: undefined,
        index: 0,
        position:'--side',
    },
    center:{
        source: undefined,
        index: 1,
        position:'--center',
    },
    right:{
        source: undefined,
        index: 2,
        position:'--side',
    }
};
const cacheStore = writable({slides, cache, gamesData, showSlides});

export default cacheStore;