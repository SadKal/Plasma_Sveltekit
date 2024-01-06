<script>
    import cartStore from "$lib/stores/cart";
    import { clickOutside } from "$lib/utils/outsideCart";
    import CartGame from './CartGame.svelte';
</script>

<div class="cart-info" class:active={$cartStore.cartActive} 
    use:clickOutside 
    on:click_outside={ () => $cartStore.cartActive=false }
    >
    <div class="cart-info__games">
        {#each $cartStore.gamesInCart as game}
            <CartGame {game}/>
        {/each}
        {#if $cartStore.gamesInCart.length == 0}
            <div class="cart-info__empty">
                <p>El carro está vacío.</p>
                <p>¡Añade algun juego!</p>
            </div>
        {:else}
            <div class="cart-info__total clearfix">
                <div class="cart-info__buy" on:click={cartStore.buyGames}>
                    Comprar
                </div>
                <div class="cart-info__text">
                    Total:
                </div>
                <div class="cart-info__price">
                    {$cartStore.cartTotal/100}€
                </div>
            </div>
        {/if}
    </div>
</div>

<style lang="scss">

    .clearfix::after {
        content: ""; 
        clear: both;
        display: block;
    } 

    .cart-info{
        box-sizing: border-box;
        position: absolute;
        cursor: default;

        opacity: 0;
        right: 50%;
        top: 0;
        width: 0;
        height: 0;
        z-index: 200;

        transition: all .3s ease-in-out;
        overflow: hidden;

        &.active{
            opacity: 100%;
            right: 50%;
            top: 150%;
            background-color: var(--cart-bg-color);
            width: 40rem;
            height: 28rem;
            border: 3px ridge var(--text-color);
            padding: 1rem 1rem 0 1rem;
            box-shadow: 5px 5px 5px .5px black;
            overflow: auto;
            @media (max-width: 650px) {
                top: 200%;
                width: 30rem;
            }
            @media (max-width: 550px) {
                width: 25rem;
            }
            @media (max-width: 420px) {
                width: 20rem;
            }
        }
        &__games{
            max-height: 90%;
            position: relative;
        }
        &__empty{
            text-align: center;
            font-size: 2rem;
            color: var(--text-color);
        }
        &__total{
            box-sizing: border-box;
            position: sticky;
            bottom: 0;
            width: 100%;
            color: var(--text-color);
            padding: 1rem;
            background-color: var(--cart-total-bg-color);
            font-weight: 600;
            letter-spacing: .1rem;
            @media (max-width: 720px) {
            font-size: 1.5rem;
        }
        }
        &__buy{
            float: left;
            height: 100%;
            font-size: 2rem;
            padding: 1rem;
            background-color: var(--cart-buy-bg-color);
            clip-path: polygon(5% 0, 100% 0%, 95% 100%, 0% 100%);
            cursor: pointer;
            transition: all .3s;
            user-select: none;
            @media (max-width: 700px) {
            font-size: 1.75rem;
        }

            &:hover{
                scale: 1.1;
            }
        }
        &__text{
            padding: 1rem;
            font-size: 2rem;
            float: left;
            @media (max-width: 700px) {
            font-size: 1.5rem;
        }
        }
        &__price{
            float: right;
            padding: 1rem;
            font-size: 2rem;
            @media (max-width: 700px) {
            font-size: 1.5rem;
        }
        }
    }
</style>