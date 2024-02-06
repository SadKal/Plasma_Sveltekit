<script>
    export let game;
    console.log(game);

</script>   

<div class="gamePage__screenshots">
    <div class="gamePage__screenshots-title">
        <span>Tus capturas de pantalla:</span>
    </div>
    <div class="gamePage__screenshots-gallery">
        {#if game.screenshots.length === 0 || game.hoursplayed === 0}
            <span>No hay capturas de pantalla disponibles :(</span>
        {:else}
            {#each game.screenshots as screenshot}
                <img src="https://images.igdb.com/igdb/image/upload/t_original/{screenshot.image_id}.jpg">
            {/each}
        {/if}
        
    </div>
</div>



<style lang="scss">
    .gamePage__screenshots{
        background-color: var(--game-title-background-color-center);
        
        &-title {
            font-size: 3rem;
            font-weight: 700;
            padding: 30px;
        }
        &-gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
            grid-gap: 30px;
            padding: 0px 50px 50px 50px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            & span {
                font-size: 1.5rem;
                font-weight: 700;
                margin: 10px;
            }
        }
    }


</style>