<script>
	import { onMount } from 'svelte';
	import { markerList, userLocation, size, icon } from '../store.js';
	import { setIconOptions } from './iconUtility.js';
	import Navigation from './Navigation.svelte';
	import logo from '$lib/assets/logo.png';

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
	function joinEvent(marker) {
		
	}

	// create new event
	function createEvent() {
		const newMarker = {
			id: $markerList.length + 1,
			lat: 51.4555 + Math.random() * 0.01,
			lng: 3.56655 - Math.random() * 0.01,
			title: `New Marker ${$markerList.length + 1}`,
			content: `This is a new marker.`
		};

		// update the store by pushing the new marker
		markerList.update((existingMarkers) => [...existingMarkers, newMarker]);

		// Show the modal
		showModal = true;
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

    // update the store by pushing the new marker
    markerList.update((existingMarkers) => [...existingMarkers, createdEvent]);
	console.log(createdEvent)

	if (map) {
    const marker = L.marker([createdEvent.lat, createdEvent.lng]).addTo(map);
    marker.bindPopup(`<b>${createdEvent.title}</b><br>${createdEvent.content}`);
    eventMarkersLayer.addLayer(marker);
  }

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
				const marker = L.marker([markerData.lat, markerData.lng]).addTo(map);
				marker.bindPopup(`<b>${markerData.title}</b><br>${markerData.content}`);
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

<div class="relative bg-background" style="height: 600px; width: 100% z-0">
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
		class="cta-button bg-primary text-text px-8 py-3 text-lg rounded-full hover:bg-accent transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-accent"
	>
		Create Event
	</button>
</section>

{#if showModal}
	
  
  <div class="fixed inset-0 z-50 flex items-center justify-center" style="z-index: 1000">
  

  <!-- Increase the size of the modal container -->
  <div class="z-40 relative p-8 bg-white rounded-md shadow-md">
    <img alt="The project logo" src={logo} class="w-16 h-16 mb-4" />
    <h2 class="text-2xl font-bold mb-4">Name of Event</h2>
      <form on:submit|preventDefault={saveEvent} class="space-y-4">
		
        <h1 class="text-orange-700">Invite our friends:</h1>
		<div class="bg-orange-200">
			<div class="flex flex-col mb-4">
          
				<select id="friend" name="friend" class="p-2 border bg-orange-400 rounded">
				  <option value="friend1">Friend 1</option>
				  <option value="friend2">Friend 2</option>
				  <option value="friend3">Friend 3</option>
				  <option value="friend4">Friend 4</option>
				  
				</select>
			  </div>
			  <div class="flex flex-col mb-4">
				  <select id="friend" name="friend" class="p-2 border bg-orange-400 rounded">
					<option value="friend1">Friend 1</option>
					<option value="friend2">Friend 2</option>
					<option value="friend3">Friend 3</option>
					<option value="friend4">Friend 4</option>
					
				  </select>
			  </div>
			  <div class="flex flex-col mb-4">
				  
				  <select id="friend" name="friend" class="p-2 border bg-orange-400 rounded">
					<option value="friend1">Friend 1</option>
					<option value="friend2">Friend 2</option>
					<option value="friend3">Friend 3</option>
					<option value="friend4">Friend 4</option>
					
				  </select>
			  </div>
		  
			  <div class="flex flex-col mb-4">
				  <select id="friend" name="friend" class="p-2 border bg-orange-400 rounded">
						<option value="friend1">Friend 1</option>
						<option value="friend2">Friend 2</option>
						<option value="friend3">Friend 3</option>
						<option value="friend4">Friend 4</option>
				  </select>
			  </div>
			  <div class="flex flex-col mb-4">
				  <select id="friend" name="friend" class="p-2 border bg-orange-400 rounded">
						<option value="friend1">Friend 1</option>
						<option value="friend2">Friend 2</option>
						<option value="friend3">Friend 3</option>
						<option value="friend4">Friend 4</option>
				  </select>
			  </div>
		</div>
		<div class="flex justify-between">
			<div class="flex flex-col mb-4" style="width: 200px;"> <!-- Adjust width as needed -->
				<div class="relative">
					
					<select id="friend" name="PICK THE PLACE" class="p-2 border bg-white-400 rounded">
						<option value="FACILITY1">FACILITY1</option>
						<option value="FACILITY2">FACILITY2</option>
						<option value="FACILITY3">FACILITY3</option>
						<option value="FACILITY4">FACILITY4</option>
					</select>
				</div>
			</div>
		
			<div class="flex flex-col mb-4" style="width: 200px;"> <!-- Adjust width as needed -->
				<div class="relative">
					
					<input type="date" id="birthday" required class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md" />
				</div>
			</div>
		
			<div class="dropdown pl-10" style="width: 200px;"> <!-- Adjust width as needed -->
				<button on:click={() => openClockPicker()} class="bg-orange-400 text-white px-10 py-2 rounded hover:bg-black-600 pl-10 pr-10">
					{selectedTime}
				</button>
				{#if showClockPicker}
					<div class="dropdown-content">
						<div class="flex justify-between">
							<!-- Hours dropdown -->
							<div class="flex flex-col">
								{#each hours as hour (hour)}
									<a on:click={() => selectedTime = `${hour}:${selectedTime.split(":")[1]}`}>{hour}</a>
								{/each}
							</div>
							<!-- Minutes dropdown -->
							<div class="flex flex-col">
								{#each minutes as minute (minute)}
									<a on:click={() => selectedTime = `${selectedTime.split(":")[0]}:${minute}`}>{minute}</a>
								{/each}
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
		
		<div class="flex justify-between items-center mb-4">
			<!-- Cancel button on the left -->
			<button type="button" on:click={closeModal} class="text-orange-500 hover:text-gray-700 px-4 py-2 rounded">Cancel</button>
		
			<!-- Save button in the middle -->
			<button type="submit" class="bg-orange-700 text-white px-4 py-2 rounded hover:bg-blue-600">Save</button>
		
			<!-- Icon for definitions on the right -->
			<div class="flex items-center">
				<!-- Replace "YourIconComponent" with your actual icon component or SVG -->
				<button type="button" on:click={closeModal} class="text-gray-500 hover:text-gray-700 px-4 py-2 rounded">Definitions</button>
			</div>
		</div>

      </form>
    </div>
  </div>
{/if}


