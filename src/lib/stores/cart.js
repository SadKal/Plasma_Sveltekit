import { writable } from "svelte/store";
import { useSharedStore } from "./use-shared-store";
import { getGamePrice } from '$lib/utils/functions.js';

const gamesInCart = [];
const cartActive = false;
let cartTotalCalc = 0.0;

const _cartStore = writable({ gamesInCart, cartActive, cartTotal: 0 });

function addGameToCart(game) {
    _cartStore.update((cart) => {
        if (!cart.gamesInCart.some(cartGame => cartGame.id === game.id)) {
            cart.gamesInCart.unshift(game);
            //Cambio el localstorage con el carrito actualizado 
            window.localStorage.setItem('cart', JSON.stringify(cart.gamesInCart));
        }
        return { ...cart, cartTotal: cartTotalCalc };
    });
};

function removeGameFromCart(game) {
    _cartStore.update((cart) => {
        if (cart.gamesInCart.some(cartGame => cartGame.id === game.id)) {
            cart.gamesInCart = cart.gamesInCart.filter((cartGame) => cartGame != game);
            //Como ya hemos eliminado en el store, solo hay que hacer set again para que se registre en localstorage el cambio
            window.localStorage.setItem('cart', JSON.stringify(cart.gamesInCart));
        }
        return { ...cart, cartTotal: cartTotalCalc };
    });
};

function getTotalPrice(cart) {
    let total = 0;
    cart.forEach(game => {
        total += getGamePrice(game.id);
    });

    return Math.round(total * 100) / 100;
}

const cartStore = {
    subscribe: _cartStore.subscribe,
    set: _cartStore.set,
    update: _cartStore.update,
    addGameToCart,
    removeGameFromCart,
    getTotalPrice
}

export const useCart = () =>
    useSharedStore('cart', cartStore);