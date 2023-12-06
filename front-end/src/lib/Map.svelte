<script>
	import { onMount } from 'svelte';
	import { markerList, userLocation, size, icon } from '../store.js';
	import { setIconOptions } from './iconUtility.js';
	import { getPopupOptions, basketballIcon } from './MarkerIcon.js';
	import Navigation from './Navigation.svelte';
	import HostIcon from './HostIcon.svelte';

	let map;
	let showError = false;
	let showLoading = false;
	let locationMarker;
	let eventMarkersLayer;
	let popupContent = ``;
	let markerIcon;

	onMount(async () => {
		// wait for the library to be imported
		const L = await import('leaflet');
		await import('leaflet.locatecontrol');
		await import('leaflet.locatecontrol/dist/L.Control.Locate.min.css');

		setIconOptions();
		markerIcon = basketballIcon(L);

		const handleUserLocationChange = (value) => {
			handleMapStatus(value);
			if (value.loaded && !map) {
				initializeMap(L, [value.latitude, value.longitude]);
			}
			updateUserLocationMarker([value.latitude, value.longitude]);
			statusTimeout();
			if (map) {
				eventMarkersLayer = L.layerGroup().addTo(map);
				updateMarkers();
			}
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

	// Updates the user location marker position on the map
	function updateUserLocationMarker(latlng) {
		if (map && locationMarker) {
			// if the map and the marker is initialized
			locationMarker.setLatLng(latlng);
		} else if (map) {
			// if the map is initialized but the marker isnt
			locationMarker = createUserLocationMarker(L, latlng);
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
		if (status.loaded == true) {
			// successfully loaded
			showLoading = false;
			showError = false;
		}
		if (status.loaded == false) {
			// still loading
			showLoading = true;
		}
		if (status == 'timeout') {
			// failed to load
			showError = true;
			showLoading = false;
		}
	}

	// initializes the marker on the map based on the users location
	function createUserLocationMarker(L, latlng) {
		const locationIcon = L.divIcon({
			className: 'leaflet-control-locate-location',
			// uses store $icon and $size variables from iconUtility.js
			html: $icon.svg,
			iconSize: [$size.s2, $size.s2]
		});

		return L.marker(latlng, { icon: locationIcon });
	}

	// create new event
	function createEvent() {
		if (map) {
			const newMarker = {
				id: $markerList.length + 1,
				lat: $userLocation.latitude + Math.random() * 0.001,
				lng: $userLocation.longitude - Math.random() * 0.001,
				status: 'notStarted',
				title: `Joao's Event #${$markerList.length + 1}`,
				content: 'Players: 4/5'
			};

			popupContent = `
			<div class="text-center">
				<h3 class="text-lg font-semibold">${newMarker.title}</h3>
				<p class="text-sm">${newMarker.content}</p>
				<button id="customButton" class="mt-2 bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
					Join Match
				</button>
			</div>
		`;

			// update the store by pushing the new marker
			markerList.update((existingMarkers) => [...existingMarkers, newMarker]);
		}
	}

	// function to update markers on the map
	function updateMarkers() {
		if (map) {
			// clear existing markers
			eventMarkersLayer.clearLayers();

			// add markers from the store array
			$markerList.forEach((markerData) => {
				const marker = L.marker([markerData.lat, markerData.lng], {
					icon: markerIcon
				}).addTo(map);
				marker.bindPopup(popupContent, getPopupOptions());
				eventMarkersLayer.addLayer(marker);
			});
		}
	}

	// subscribe to changes in the markerList store and update markers
	markerList.subscribe((value) => {
		if (map) {
			updateMarkers();
		}
	});
</script>

<div
	class="relative bg-background"
	style="height: 95%; width: 100%; z-index: 0;"
>
	<div id="mapContainer" class="h-full w-full">
		{#if showError}
			<h1>Could not load map</h1>
		{/if}
		{#if showLoading}
			<h1>Loading Map...</h1>
		{/if}
	</div>

	<!-- Center button on top of the map -->
	<button
		on:click={centerMap}
		class="absolute bottom-3 left-1/2 transform -translate-x-1/2 focus:outline-none outline-none transition-transform transform-gpu hover:scale-110 active:scale-100"
		style="z-index: 1000"
	>
		<!-- Adjust the max-w and height (h) values to make the image smaller -->
		<Navigation />
	</button>

	<button
		on:click={createEvent}
		class="absolute bottom-3 left-2 focus:outline-none outline-none transition-transform transform-gpu hover:scale-110 active:scale-100"
		style="z-index: 1000"
	>
		<HostIcon />
	</button>
</div>
