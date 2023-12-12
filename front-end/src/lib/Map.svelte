<script>
	import { onMount } from 'svelte';
	import { markerList, userLocation, size, icon } from '../store.js';
	import { setIconOptions } from './iconUtility.js';
	import Navigation from './Navigation.svelte';
	import logo from '$lib/assets/logo.png';
	import { getPopupOptions, basketballIcon } from './MarkerIcon.js';
	import Navigation from './NavigationSVG.svelte';
	import HostIcon from './HostIcon.svelte';
	import Loading from './Loading.svelte';

	let map;
	let showError = false;
	let showLoading = false;
	let locationMarker;
	let eventMarkersLayer;

  
	let showModal = false;
	let newEvent = {
    lat: '',
    lng: '',
    title: '',
    content: '',
  	};

	let showClockPicker = false;
  let selectedTime = "00:00";

  const hours = Array.from({ length: 24 }, (_, index) => index.toString().padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, index) => index.toString().padStart(2, "0"));

  function openClockPicker() {
    showClockPicker = true;
  }

  function closeClockPicker() {
    showClockPicker = false;
  }

  function saveTime() {
    // Handle the selected time (selectedTime) logic here
    closeClockPicker();
  }

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

	//join event
	function joinEvent() {
		
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
      
      // Show the modal
      showModal = true;
		}
	}

 		// Close the modal
	function closeModal() {
    // Close the modal and reset input values
    showModal = false;
    newEvent = {
      lat: '',
      lng: '',
      title: '',
      content: '',
    };
  	}

	function saveEvent() {
    const { lat, lng, title, content } = newEvent;

    const createdEvent = {
      id: $markerList.length + 1,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      title,
      content,
    };


    // Close the modal
    showModal = false;
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
<style>
	/* Add styles for the overlay */
	.overlay {
	  position: fixed;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  background-color: rgba(0, 0, 0, 0.5);
	  z-index: 1000;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	}
  
	/* Add styles for the modal */
	.modal {
	  background-color: white;
	  padding: 20px;
	  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	  border-radius: 10px; /* Adjust as needed */
	}

	.dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #ccc;
    background-color: #fff;
    z-index: 1;
  }

  .dropdown-content a {
    padding: 10px;
    text-decoration: none;
    display: block;
    color: #333;
  }
  
  .dropdown-content a:hover {
    background-color: #f1f1f1;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
  </style>

<div class="relative bg-background h-screen md:h-96" style="width: 100%; z-index: 0;">
    <div id="mapContainer" class="h-full w-full">
        {#if showError}
            <h1 class="text-lg md:text-xl">Could not load map</h1>
        {/if}
        {#if showLoading}
            <h1 class="text-lg md:text-xl">Loading Map...</h1>
        {/if}
    </div>

    <!-- Center button on top of the map -->
    <button
        on:click={centerMap}
        class="absolute bottom-3 left-1/2 transform -translate-x-1/2 focus:outline-none outline-none"
        style="z-index: 1000"
    >
        <!-- Adjust the max-w and height (h) values to make the image smaller -->
        <Navigation />
    </button>
</div>

<!-- Create event button below the map -->
<section class="mt-4 flex items-center justify-center">
    <button
        on:click={createEvent}
        class="cta-button bg-button text-text px-8 py-3 text-lg rounded-full hover:bg-accent transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-accent"
    >
        Create Event
    </button>
</section>

{#if showModal}
    <div class="fixed inset-0 z-50 flex items-center justify-center" style="z-index: 1000;">
        <!-- Increase the size of the modal container -->
        <div class="z-40 relative p-4 md:p-8 bg-white rounded-md">
            <img alt="The project logo" src={logo} class="w-12 h-12 mb-2 md:w-16 md:h-16 md:mb-4" />
            <h2 class="text-lg md:text-2xl font-bold mb-2 md:mb-4 ps-3">Name of Event</h2>
            <form on:submit|preventDefault={saveEvent} class="space-y-2 md:space-y-4">
                <h1 class="text-titles text-sm md:text-base ps-3">Invite our friends:</h1>

                <div class="flex flex-col items-center mb-2 md:mb-4">
                    <button class="bg-titles text-text rounded-full px-10 hover:bg-accent transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-accent">
                        Add friends
                    </button>
                </div>

                <div class="flex flex-col items-center mb-2 md:mb-4" style="width: 100%;">
                    <div class="flex items-center bg-titles rounded-full p-2">
                        <p class="text-xs md:text-sm mr-2">Pick the facility:</p>
                        <div class="relative">
                            <select id="facility" name="facility" class="p-2 border bg-titles rounded text-white text-xs md:text-sm">
                                <option value="FACILITY1">FACILITY1</option>
                                <option value="FACILITY2">FACILITY2</option>
                                <option value="FACILITY3">FACILITY3</option>
                                <option value="FACILITY4">FACILITY4</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col items-center mb-2 md:mb-4" style="width: 100%;">
                    <div class="flex items-center bg-titles rounded-full p-2">
                        <p class="text-xs md:text-sm mr-2">Pick the time:</p>
                        <div class="dropdown"> <!-- Adjust width as needed -->
                            <button on:click={() => openClockPicker()} class="bg-titles text-white px-6 py-2 rounded hover:bg-black-600 md:px-10 md:py-2 md:pl-10 md:pr-10 text-xs md:text-sm border">
                                {selectedTime}
                            </button>
                            {#if showClockPicker}
                                <div class="dropdown-content">
                                    <div class="flex justify-between">
                                        <!-- Hours dropdown -->
                                        <div class="flex flex-col">
                                            {#each hours as hour (hour)}
                                                <a on:click={() => selectedTime = `${hour}:${selectedTime.split(":")[1]}`} class="text-xs md:text-sm">{hour}</a>
                                            {/each}
                                        </div>
                                        <!-- Minutes dropdown -->
                                        <div class="flex flex-col">
                                            {#each minutes as minute (minute)}
                                                <a on:click={() => selectedTime = `${selectedTime.split(":")[0]}:${minute}`} class="text-xs md:text-sm">{minute}</a>
                                            {/each}
                                        </div>
                                    </div>
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>

                <div class="flex flex-col mb-2 md:mb-4" style="width: 100%;">
                    <div class="relative">
                        <input type="date" id="birthday" required class="w-full px-3 py-2 mb-2 md:mb-4 border border-gray-300 rounded-md text-xs md:text-sm" />
                    </div>
                </div>

                <div class="flex justify-between items-center mb-2 md:mb-4">
                    <!-- Cancel button on the left -->
                    <button type="button" on:click={closeModal} class="text-titles hover:text-gray-700 px-2 md:px-4 py-1 md:py-2 rounded text-xs md:text-sm">Cancel</button>

                    <!-- Save button in the middle -->
                    <button type="submit" class="bg-button text-white px-2 md:px-4 py-1 md:py-2 rounded hover:bg-blue-600 text-xs md:text-sm">Save</button>

                    <!-- Icon for definitions on the right -->
                    <div class="flex items-center">
                        <!-- Replace "YourIconComponent" with your actual icon component or SVG -->
                        <button type="button" on:click={closeModal} class="text-gray-500 hover:text-gray-700 px-2 md:px-4 py-1 md:py-2 rounded text-xs md:text-sm">Definitions</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
{/if}

<div
	class="relative bg-background"
	style="height: 93%; width: 100%; z-index: 0;"
>
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
	{/if}
</div>
