<script>
	import Recents from '$lib/components/library/recents/Recents.svelte';
	import YourGames from '$lib/components/library/yourgames/YourGames.svelte';
	import { useUser } from '$lib/stores/user';

	export let data;
	const userStore = useUser();
	$userStore = data;
</script>

<Recents />
<YourGames />
