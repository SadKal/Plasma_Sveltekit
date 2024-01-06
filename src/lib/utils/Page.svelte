<script>
    import pagesStore from "$stores/pages";
</script> 

{#each Object.entries($pagesStore.pages) as [ name, component ]}
    {#if name == $pagesStore.active}
        <svelte:component this={component}/>
    {/if}
{/each}
 