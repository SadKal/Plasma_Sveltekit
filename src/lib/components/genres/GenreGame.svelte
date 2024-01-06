<script>
    import libraryStore from "$lib/stores/library";
    import cartStore from "$lib/stores/cart"
    import { goto } from "$app/navigation"

    export let game;

    let genreGame;
    let gameOwned;
    let gameInCart;
    
    $: if($libraryStore.gamesInLibrary.includes(game)){
        gameOwned=true;
    }
    $: 	if ($cartStore.gamesInCart.includes(game)){
			gameInCart=true;
		}else{
			gameInCart=false;
		}
</script>

<div 
bind:this={genreGame} 
class="genre-game clearfix"
on:click={ () => goto(`/game/${game.id}`)}>
    <div class="genre-game__img--container">
        <img class="genre-game__img" src={game.image}/>
    </div>

    <div class="genre-game__name">
        {game.name}
        <div class="genre-game__genres">
            {#each game.genres as genre, index}
                <span>{genre}</span>{index === game.genres.length - 1 ? '' : ', '}
            {/each}
        </div>
    </div>
    <div class="genre-game__price">
        {#if gameOwned}
            Ya tienes este juego.
        {:else if gameInCart}
            El juego ya esta en el carrito.
        {:else}
            {game.price/100}€
        {/if}
    </div>
    
</div>

<style lang="scss">
    .clearfix::after {
        content: ""; 
        clear: both;
        display: block;
    } 
    .genre-game{
        margin: .3rem auto;
        width: 80%;
        height: 250px;
        box-sizing: border-box;

        font-weight: 700;
        background-color: rgba(0,74,64,.5);
        color: var(--text-color);
        clip-path: polygon(2% 0, 100% 0%, 98% 100%, 0% 100%);        
        transition: all .3s ease-in-out;
        @media (max-width: 1200px) {
                height: 200px;
            }
        &:hover{
            background-color: rgb(0,74,64);
            transform: translateX(-10%);
            z-index: 5;
            cursor: pointer;
        }

        &__img{
            height: 100%;
            width: 100%;
            object-fit: cover;
            clip-path: polygon(7% 0, 100% 0%, 93% 100%, 0% 100%);

            &--container{
                height: 100%;
                width: 30%;
                margin-right: 1.5rem;
                float: left;     
            }
            @media (max-width: 1200px) {
                height: 200px;
                margin-right: 1rem;
            }
        }

        &__name{
            margin-left: 3rem;
            margin-top: 1rem;
            font-size: 2.5rem;
            position: relative;
            top: 40%;
            transform: translateY(-50%);
            float: left;
            font-style: italic;
            color: var(--selected-text-color);
            @media (max-width: 1200px) {
                width: 30%;
                font-size: 1.5rem;
                margin-left: 1.5rem;
                margin-top: 1rem;
            }
            @media (max-width: 750px) {
                font-size: 1.25rem;
                margin-left: 1rem;
            }
            @media (max-width: 550px) {
                font-size: 1rem;
                margin-left: 1rem;
            }
        }
        &__genres{
            position: relative;
            margin-top: 3rem;
            font-size: 1.5rem;
            left: -10%;
            color: var(--text-color);
            @media (max-width: 1200px) {
                font-size: 1rem;
                margin-top: 1rem;
            }
        }

        &__price{
            font-size: 1.7rem;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            float: right;
            margin-right: 5rem;
            max-width: 15%;
            text-align: center;
            @media (max-width: 1200px) {
                font-size: 1.25rem;
                margin-right: 2.5rem;
            }
        }
    }
</style>