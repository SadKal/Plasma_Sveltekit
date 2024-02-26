import { writable } from "svelte/store";
import { useSharedStore } from "./use-shared-store";

const gamesInCart = [];
const cartActive = false;
let cartTotalCalc = 0;

const _cartStore = writable({ gamesInCart, cartActive, cartTotal: 0 });

function addGameToCart(game) {
    _cartStore.update((cart) => {
        if (!cart.gamesInCart.some(cartGame => cartGame.id === game.id)) {
            cart.gamesInCart.unshift(game);
            cartTotalCalc += parseInt(game.price);
        }
        return { ...cart, cartTotal: cartTotalCalc };
    });
};

function removeGameFromCart(game) {
    _cartStore.update((cart) => {
        if (cart.gamesInCart.some(cartGame => cartGame.id === game.id)) {
            cart.gamesInCart = cart.gamesInCart.filter((cartGame) => cartGame != game);
            cartTotalCalc -= parseInt(game.price);
        }
        return { ...cart, cartTotal: cartTotalCalc };
    });
};

const cartStore = {
    subscribe: _cartStore.subscribe,
    set: _cartStore.set,
    update: _cartStore.update,
    addGameToCart,
    removeGameFromCart
}

export const useCart = () =>
    useSharedStore('cart', cartStore);