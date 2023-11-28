<script>
	import { onMount } from 'svelte';
	import { userLocation, size, icon } from '../store.js';
	import { setIconOptions } from './iconUtility.js';

	let map;
	let showError = false;
	let showLoading = false;
	let locationMarker;

	onMount(async () => {
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

		userLocation.subscribe(handleUserLocationChange);
	});

	function initializeMap(L, latlng) {
		map = L.map('mapContainer').setView(latlng, 17);
		L.tileLayer(
			'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
		).addTo(map);
	}

	// Updates the location marker position on the map
	function updateLocationMarker(latlng) {
		if (map && locationMarker) {
			locationMarker.setLatLng(latlng);
		} else if (map) {
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
			handleMapStatus($userLocation.loaded); // map loaded
		}, 5000);
	}

	// Handles the status messages of the map based on the $userlocation.loaded
	function handleMapStatus(status) {
		if (status.loaded == true) {
			showLoading = false;
			showError = false;
		}
		if (status.loaded == false) {
			showLoading = true;
		}
		if (status == 'timeout') {
			showError = true;
			showLoading = false;
		}
	}

	function createLocationMarker(L, latlng) {
		const locationIcon = L.divIcon({
			className: 'leaflet-control-locate-location',
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
