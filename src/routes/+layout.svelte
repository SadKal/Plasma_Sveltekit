<script>
    import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app">
    <Header />
    <slot/>
</div>

<style lang="scss">
    
    div {
      color: white;
    }
</style>
  

