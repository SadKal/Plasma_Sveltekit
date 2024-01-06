<script>
	export let label = "";
	export let values = [];
	export let selectedValue = "";
	export let disabled = false;
	export let eventClick = (_) => {};

	function selectValue(value) {
		eventClick(selectedValue);
	}
</script>

<select
	aria-label={label}
	bind:value={selectedValue}
	{disabled}
	on:change={() => selectValue()}
	{...$$restProps}
>
	{#each values as value (value)}
		<option
			{disabled}
			on:click|stopPropagation={() => selectValue(value)}
			{value}>{value}</option
		>
	{/each}
</select>

<style lang="scss">
	*,
	*::after,
	*::before {
		appearance: none;
		background-color: transparent;
		border: none;
		outline: none;
		padding: 0 0 0 0;
		margin: 0;
		width: 100%;
		font-family: inherit;
		font-size: inherit;
		cursor: inherit;
		line-height: inherit;
	}
	select {
		font-size: 22px;
		font-weight: 600;	
		vertical-align: bottom;
		text-align: center;
		color: var(--text-color);
		border: 6px solid var(--text-color);
		width: 200px;
		height: 65px;
		overflow: hidden;
		cursor: pointer;
		background-color: transparent;
	}
</style>
