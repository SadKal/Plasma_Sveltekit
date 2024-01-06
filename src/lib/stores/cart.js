import { writable } from "svelte/store";
import libraryStore from "./library";

const gamesInCart = [];

const cartActive = false;
let cartTotalCalc=0;

const cartStore = writable({gamesInCart, cartActive, cartTotal: 0});

function addGameToCart(game){
    cartStore.update( (cart) => {
        if (!cart.gamesInCart.includes(game)){
            //Añado el juego al principio de la lista
            cart.gamesInCart.unshift(game);
            //Actualizo el precio total
            cartTotalCalc += parseInt(game.price);
        }
        return {...cart, cartTotal: cartTotalCalc};
    });
};

function removeGameFromCart(game){
    cartStore.update( (cart) => {
        if(cart.gamesInCart.includes(game)){
            cart.gamesInCart = cart.gamesInCart.filter((cartGame) => cartGame != game);
            cartTotalCalc -= parseInt(game.price);
        }
        return {...cart, cartTotal: cartTotalCalc};
    });
};

function buyGames(){
    cartStore.update( (cart) => {
        libraryStore.update( (library) => {
            cart.gamesInCart.forEach(game => {
                if(!library.gamesInLibrary.includes(game)){
                    game.adqDate = Date.now();
                    game.hrsPlayed = 0
                    library.gamesInLibrary.push(game);

                }
            });
            return library; 
        });
        cartTotalCalc=0;
        return {...cart, gamesInCart: [], cartTotal: cartTotalCalc};
    })
}

export default {...cartStore, addGameToCart, removeGameFromCart, buyGames};