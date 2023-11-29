<script>
	import { userLocation } from '../store.js';
	import { onMount } from 'svelte';

	// options for geolocation api functioons
	const locationOptions = {
		enableHighAccuracy: false,
		timeout: 500,
		maximumAge: 500
	};

	//updates position of the store
	function positionUpdated(position) {
		// console.log('Position updated:', position.coords);
		const { latitude, longitude, accuracy } = position.coords;
		userLocation.set({ latitude, longitude, accuracy, loaded: true });
	}

	// calls the functions after the dom is loaded
	onMount(() => {
		window.navigator.geolocation.getCurrentPosition(
			positionUpdated,
			null,
			locationOptions
		);
		// start watching for position changes
		window.navigator.geolocation.watchPosition(
			positionUpdated,
			null,
			locationOptions
		);
	});
</script>

<h1 class="mt-4 ml-2 text-xl font-black text-gray-900 dark:text-white">
	User Location Info:
</h1>

<div class="mt-4 ml-4">
	<h2 class="text-xl font-bold text-gray-900/50 dark:text-white">Latitude:</h2>
	<h3 class="text-l font-bold text-gray-900 dark:text-white">{$userLocation.latitude}</h3>
</div>
<div class="mt-6 ml-4">
	<h2 class="text-xl font-bold text-gray-900/50 dark:text-white">Longitude:</h2>
	<h3 class="text-l font-bold text-gray-900 dark:text-white">{$userLocation.longitude}</h3>
</div>
<div class="mt-6 ml-4">
	<h2 class="text-xl font-bold text-gray-900/50 dark:text-white">Acurracy:</h2>
	<h3 class="text-l font-bold text-gray-900 dark:text-white">{$userLocation.accuracy} meters</h3>
</div>
