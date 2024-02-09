<script>
	export let title = '';
	export let content = '';
	export let font_size = '1rem';
</script>

<div class="shopPageTextField" style="font-size: {font_size};">
	<h1>{title}</h1>

	{#if Array.isArray(content)}
		{#each content as element}
			<p>{element}</p>
		{/each}
	{:else}
		<p>{content}</p>
	{/if}
</div>

<style lang="scss">
	.shopPageTextField {
		& h1 {
			color: var(--subtitle-text-color);
			font-size: 2rem;
		}
		& p {
			color: var(--text-color);
			font-weight: 600;
			line-height: 140%;
			margin: 3px 0;
		}
	}
</style>
