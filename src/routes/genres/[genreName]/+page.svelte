<script>
    import genresStore from "$lib/stores/genres";
    import GenreGame from "$lib/components/genres/GenreGame.svelte";
    import { goto } from '$app/navigation';

    export let data;

    //Por como esta construido, el genero actual siempre estará arriba
    let genreList = [];
    $: genreList = $genresStore.genreList.filter((el) => el!=data.genre ).sort();

    let selectedOption;

    function changeSelection(event){
        selectedOption = event.target.value;
        goto(`/genres/${selectedOption}`);
    }
</script>

<!--Este key es solo para forzar el rerender para la animacion, funciona perfectamente sin el-->
{#key selectedOption}
<div class="genres">    
    <div class="genres__title">
        <div class="genres__title--name">
            <select 
                bind:value={selectedOption}
                on:input={changeSelection}
                class="genres__select">

                <option selected>{data.genre}</option>
                
                {#each genreList as genreOption}
                    <option>{genreOption}</option>
                {/each} 
            </select>
        </div>
    </div>
   
    <div class="genres__game-list">
        {#each data.gameList as game}
            <GenreGame {game}/>
        {/each}
    </div>
</div>
{/key}


<style lang="scss">
    option{
        background-color: var(--text-color);
        font-size: 1.5rem;
        padding: 5rem;        
    }

    .genres{
        animation: fadein var(--seconds-fadein) ease-in;
        &__select{
            text-align: center;
            background-color: transparent;
            border: none;
            width: 100%;
            font-family: inherit;
            font-size: inherit;
            font-style: italic;
            cursor: pointer;
            color: lightgray;
            &:focus{
                outline: none;
            }
        }

        &__title{
            box-sizing: border-box; 
            position: fixed;
            margin-top: -96px;
            left: 50%;
            transform: translateX(-50%);
            width: 25rem;
            outline: none;
            
            padding: 1rem 2rem;
            font-weight: 700;
            background-color: var(--text-color);
            color: var(--game-title-color-center);

            clip-path: polygon(5% 0, 100% 0%, 95% 100%, 0% 100%);
            z-index: 20;
            font-size: 2rem;
            @media (max-width: 750px) {
                width: 55vw;
                font-size: 1.25rem;
            }
        }

        &__game-list{
            margin-top: 6rem;
            padding-bottom: 5rem;
        }
    }
</style> 