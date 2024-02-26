<script>
    import Searchbar from "$lib/components/search/Searchbar.svelte";
    import Novedades from "$lib/components/news/Novedades.svelte";
    import Slideshow from '$lib/components/news/Slideshow.svelte';
	import MostSold from "$lib/components/most_sold/MostSold.svelte";
	import Genres from "$lib/components/genres/Genres.svelte";
	import { onMount } from "svelte";

	export let data;
	let { bestRated, slides, genres } = data;

    function scrollOnLoad() {
		requestAnimationFrame(() => {
			if (window.matchMedia("(max-width: 420px)").matches) {
				window.scroll({
					top: 60,  
					behavior: 'smooth'
				});
			} else {
				window.scroll({
					top: 90,  
					behavior: 'smooth'
				});
			}
		});
	}

    onMount(() => {
        scrollOnLoad();
    }); 
</script>
 
<div class="app-body">
	<Searchbar/>

	<Novedades/>

	<Slideshow {slides}/>

	<MostSold mostSold={bestRated}/>

	<Genres {genres}/>
</div>

<style lang="scss">
	.app-body {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>