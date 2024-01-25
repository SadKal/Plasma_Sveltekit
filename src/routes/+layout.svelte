<script>
    import './styles.css';
    import Header from './Header.svelte';
    import Footer from './Footer.svelte';
    import libraryStore from "$lib/stores/library";
    import games from "$lib/data/games.json"
	import { onMount } from "svelte";

    onMount ( () => {
        $libraryStore.recentlyPlayed = $libraryStore.fetchRecents(0, (games.data.length - 1))
		$libraryStore.gamesInLibrary = $libraryStore.fetchOwned(0, (games.data.length - 1))
    });
</script>

<div class="app">
    <!-- <Header /> -->
    <slot/>
    <!-- <Footer /> -->
</div>

<style lang="scss">
    
    div {
      color: white;
    }
</style>
  

