<script>
    import cartStore from "$lib/stores/cart";
    import CartInfo from "./CartInfo.svelte";
</script>

<li class="cart--container">
    <div class="cart__count--container">
        <div class="cart__count">
            {$cartStore.gamesInCart.length}
        </div> 
    </div>
    <div on:click={() => $cartStore.cartActive = !$cartStore.cartActive}>
        <object class="cart" data="/svgs/cart.svg" type="image/svg+xml" width="70%" height="auto"/>
    </div>
    <CartInfo/>
</li>
 
 
<style lang="scss">
    .cart{
        box-sizing: border-box;
        user-select: none; 
        pointer-events: none;

        &--container{
            position: absolute;
            top: 15%;
            right: 0;
            width: 5rem;
            cursor: pointer;
            @media (max-width: 750px){
                top: 1%
            }
            @media (max-width: 420px){
                top: 1%
            }
        }

        &__count{
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            color: lightgray;
            user-select: none;

            &--container{
                width: 1rem;
                height: 1rem;
                text-align: center;
                position: absolute;
                right: 25%;
                background-color:rgb(0, 33, 29);
                padding: .3rem;
                border-radius: 50%;
                
            }
        }
    }
</style>