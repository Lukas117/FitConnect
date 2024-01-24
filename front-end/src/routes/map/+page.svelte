<script>
	import SideBar from '$lib/SideNav/SideBar.svelte';
	import NavBar from '$lib/NavBar/NavBar.svelte';
	import Map from '$lib/Map/Map.svelte';
	import Location from '$lib/Map/Location.svelte';
	import { checkAuth } from '$lib/auth.js';
	import { onMount } from 'svelte';
	import { navigate } from 'svelte-routing';

	let userId;
	onMount(() => {
		checkAuth(fetch)
			.then((result) => {
				userId = result;
				console.log('Authentication successful:', result);
			})
			.catch((error) => {
				console.error('Authentication error:', error);
				navigate('/user/login');
				window.location.reload();
			});
	});
</script>

<div class="w-full h-full bg-background">
	<Map {userId} />

	<div
		class="absolute top-0 right-0 focus:outline-none outline-none"
		style="z-index: 1000"
	>
		<SideBar />
	</div>

	<NavBar />

	<Location />
</div>
