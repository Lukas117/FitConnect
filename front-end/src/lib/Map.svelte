<script>
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import {
		userLocation,
		size,
		icon,
		showHostModal,
		facilities,
		refreshEvents
	} from '../store.js';
	import { setIconOptions } from './iconUtility.js';

	import { getPopupOptions, basketballIcon } from './MarkerIcon.js';
	import NavigationIcon from './NavigationSVG.svelte';
	import HostIcon from './HostIcon.svelte';
	import Loading from './Loading.svelte';
	import HostModal from './Map/HostModal.svelte';
	import JoinEventModal from './Map/JoinEventModal.svelte';
	import getPopupContent from './Map/popupContent.js';

	let map;
	let showError = false;
	let showLoading = false;
	let locationMarker;
	let eventMarkersLayer;
	let markerIcon;
	let facilityData;
	let intervalId;
	let eventData;

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
		};
		userLocation.subscribe(handleUserLocationChange); // calls function everytime userLocation updates

		refreshEvents.subscribe((value) => {
			if (value) {
				getEvents();
			}
		});

		await getFacilities();
		await getEvents();

		intervalId = setInterval(getEvents, 10000); // Call getEvents every 5 seconds
	});

	onDestroy(() => {
		clearInterval(intervalId); // Clear the interval when the component is destroyed
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

	async function sendEventRequest() {
		const newEvent = {
			eventId: '9',
			eventName: 'Basketball',
			hostedName: "Joao's",
			startDate: '2023-11-20T09:00:00Z',
			endDate: '',
			eventState: 'inProgress',
			maximumPlayers: 10,
			hostId: '5',
			playerList: ['player1', 'player2', 'player3'],
			facilityId: '5678'
		};

		const response = await fetch('http://localhost:3012/api/events', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},

			body: JSON.stringify({ newEvent })
		});
		const data = await response.json();
	}

	// create new event
	function createEvent() {
		if (map) {
			sendEventRequest();
		}
	}

	// function to update markers on the map
	function updateMarkers(eventData) {
		if (map) {
			// clear existing markers
			eventMarkersLayer.clearLayers();

			// add markers from the fetched data
			eventData.forEach((singleEvent) => {
				// Find the corresponding facility for the current marker

				const facility = facilityData.find(
					(facility) => facility.facility_id == singleEvent.facility_id
				);

				if (facility) {
					const marker = L.marker([facility.latitude, facility.longitude], {
						icon: markerIcon
					})
						.bindPopup(getPopupContent(singleEvent), getPopupOptions())
						.addTo(map);

					eventMarkersLayer.addLayer(marker);
				}
			});
		}
	}

	async function getFacilities() {
		try {
			const response = await fetch('http://localhost:3013/facilities', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			facilityData = await response.json();

			$facilities = facilityData;

			console.log($facilities);
		} catch (error) {
			console.error('Error fetching facilities:', error);
		}
	}

	async function getEvents() {
		try {
			const response = await fetch('http://localhost:3012/events', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			eventData = await response.json();

			console.log('get events');

			if (map) {
				if (eventMarkersLayer) {
					eventMarkersLayer.clearLayers();
				} else {
					eventMarkersLayer = L.layerGroup().addTo(map);
				}
				eventMarkersLayer = L.layerGroup().addTo(map);
				updateMarkers(eventData);
			} else {
				console.error('Map is not defined');
			}
			// Update the markers after updating the markerData
		} catch (error) {
			console.error('Error fetching events:', error);
		}
	}

	function displayHostModal() {
		$showHostModal = true;
	}
</script>

<div
	class="relative bg-background"
	style="height: 93%; width: 100%; z-index: 0;"
>
	<JoinEventModal />
	<HostModal />
	<div id="mapContainer" class="h-full w-full">
		{#if showError}
			<div
				class="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold animate-fade-in mb-2"
			>
				Could not load map
			</div>
		{/if}
		{#if showLoading}
			<Loading />
		{/if}
	</div>

	{#if !showError && !showLoading}
		<!-- Center button on top of the map -->
		<button
			id="navigationButton"
			on:click={centerMap}
			class="absolute bottom-3 left-1/2 transform -translate-x-1/2 focus:outline-none outline-none transition-transform transform-gpu hover:scale-110 active:scale-100"
			style="z-index: 1000"
		>
			<!-- Adjust the max-w and height (h) values to make the image smaller -->
			<NavigationIcon />
		</button>

		<button
			id="hostButton"
			on:click={displayHostModal}
			class="absolute bottom-3 left-2 focus:outline-none outline-none transition-transform transform-gpu hover:scale-110 active:scale-100"
			style="z-index: 1000"
		>
			<HostIcon />
		</button>
	{/if}
</div>
