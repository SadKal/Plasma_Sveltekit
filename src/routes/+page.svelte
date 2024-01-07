<script>
    import Searchbar from "$lib/components/search/Searchbar.svelte";
    import Novedades from "$lib/components/news/Novedades.svelte";
    import Slideshow from '$lib/components/news/Slideshow.svelte';
	import MostSold from "$lib/components/most_sold/MostSold.svelte";
	import Genres from "$lib/components/genres/Genres.svelte";
	import { onMount } from "svelte";

	export let data;
    
    function scrollOnLoad() {
		requestAnimationFrame(() => {
			if (window.matchMedia("(max-width: 420px)").matches) {
				window.scrollTo(0, 60);
			} else {
				window.scrollTo(0, 90);
			}
		});
	}

    onMount(() => {
        if ("scrollRestoration" in history) {
			history.scrollRestoration = "manual";
		}
        scrollOnLoad();
    });
</script>

<Searchbar/>

<Novedades/>

<Slideshow {data}/>

<MostSold/>

<Genres/>