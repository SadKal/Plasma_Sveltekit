<script>
	import '../app.pcss';
	import './styles.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { useUser } from '$lib/stores/user';

	export let data;
	const userStore = useUser();
	$userStore = data;
</script>

<div class="app">
	<Header></Header>
	<slot />
	<Footer></Footer>
</div>

<style lang="scss">
	div {
		color: white;
	}
</style>
