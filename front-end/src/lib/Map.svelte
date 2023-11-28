<script>
	import { onMount } from 'svelte';
	import { userLocation, size, icon } from '../store.js';
	import { setIconOptions } from './iconUtility.js';

	let map;
	let showError = false;
	let showLoading = false;
	let locationMarker;

	onMount(async () => {
		// wait for the library to be imported
		const L = await import('leaflet');
		await import('leaflet.locatecontrol');
		await import('leaflet.locatecontrol/dist/L.Control.Locate.min.css');

		setIconOptions();

		const handleUserLocationChange = (value) => {
			handleMapStatus(value);
			if (value.loaded && !map) {
				initializeMap(L, [value.latitude, value.longitude]);
			}
			updateLocationMarker([value.latitude, value.longitude]);
			statusTimeout();
		};

		userLocation.subscribe(handleUserLocationChange); // calls function everytime userLocation updates
	});

	// function for initializing the leaflet map
	function initializeMap(L, latlng) {
		map = L.map('mapContainer').setView(latlng, 17);
		L.tileLayer(
			'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
		).addTo(map);
	}

	// Updates the location marker position on the map
	function updateLocationMarker(latlng) {
		if (map && locationMarker) { // if the map and the marker is initialized
			locationMarker.setLatLng(latlng);
		} else if (map) { // if the map is initialized but the marker isnt
			locationMarker = createLocationMarker(L, latlng);
			locationMarker.addTo(map);
		}
	}

	// centers the map to $userlocation
	function centerMap() {
		if (map) {
			map.flyTo([$userLocation.latitude, $userLocation.longitude], 16);
		}
	}

	// controls the status message of the map and is dependent on $userlocation
	// has a time out of 5 seconds
	function statusTimeout() {
		setTimeout(() => {
			if (!$userLocation.loaded) {
				handleMapStatus('timeout'); // set the status message to couldnt load map
			}
			handleMapStatus($userLocation.loaded); // set status to loaded or failed
		}, 5000);
	}

	// Handles the status messages of the map based on the $userlocation.loaded
	function handleMapStatus(status) {
		if (status.loaded == true) { // successfully loaded
			showLoading = false;
			showError = false;
		}
		if (status.loaded == false) { // still loading
			showLoading = true;
		}
		if (status == 'timeout') { // failed to load
			showError = true;
			showLoading = false;
		}
	}

	// initializes the marker on the map based on the users location
	function createLocationMarker(L, latlng) {
		const locationIcon = L.divIcon({
			className: 'leaflet-control-locate-location',
			// uses store $icon and $size variables from iconUtility.js
			html: $icon.svg, 
			iconSize: [$size.s2, $size.s2]
		});

		return L.marker(latlng, { icon: locationIcon });
	}

</script>

<div id="mapContainer" style="height: 600px; width: 100%">
	{#if showError}
		<h1>Could not load map</h1>
	{/if}
	{#if showLoading}
		<h1>Loading Map...</h1>
	{/if}
</div>

<button on:click={centerMap}>Center</button>
