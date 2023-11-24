<script>
	import "../app.css";
</script>

<div class="flex flex-col h-screen justify-between">
	<main>
		<slot /> <!-- here the page content of +page.svelte is loaded-->
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>

<style>
</style>
