<script>
	import Company from './Company.svelte';
	import GameShopTextField from '$lib/utils/GameShopTextField.svelte';
	export let game;

	let companies = [];
	if (game.involved_companies) {
		game.involved_companies.forEach((company) => {
			companies.push(company.company);
		});
	}
</script>

{#if game.involved_companies}
	<GameShopTextField title="Desarrollado por:" />
	<div class="companies">
		{#each companies as company}
			<Company {company} />
		{/each}
	</div>
{/if}

<style lang="scss">
	.companies {
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
		align-items: center;
	}
</style>
