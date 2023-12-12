<script>
	import SideBar from '$lib/SideBar.svelte';
	import NavBar from '$lib/NavBar/NavBar.svelte';
	import Map from '$lib/Map.svelte';
	import Location from '$lib/Location.svelte';
</script>

<div class="w-full h-full bg-background">
	<Map />

	<div
		class="absolute top-0 right-0 focus:outline-none outline-none"
		style="z-index: 1000"
	>
		<SideBar />
	</div>

	<NavBar />

	<Location />
</div>
