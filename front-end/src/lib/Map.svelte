<script>
	import { onMount } from 'svelte';
	import { userLocation } from '../store.js';
	// import { icon } from '../store.jsjs';

	let map;
	let showError = false;
	let showLoading = false;

	onMount(async () => {
		const L = await import('leaflet');
		await import('leaflet.locatecontrol');
		await import('leaflet.locatecontrol/dist/L.Control.Locate.min.css');

		const handleUserLocationChange = (value) => {
      handleMapStatus(value);
			if (value.loaded && !map) {
				const L = window.L;
				map = L.map('mapContainer').setView(
					[value.latitude, value.longitude],
					17
				);
				L.tileLayer(
					'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
				).addTo(map);
			}
      statusTimeout();
		};

		userLocation.subscribe(handleUserLocationChange);
		
		// console.log(icon);
		// const locationMarker = L.marker([$userLocation.latitude, $userLocation.longitude], { icon: icon });
		// locationMarker.addTo(map);
	});

	// centers the map to $userlocation
	function centerMap() {
		if (map) {
			map.flyTo([$userLocation.latitude, $userLocation.longitude], 16);
		}
	}

	// controls the status message of the map and is dependent on $userlocation
	function statusTimeout() {
		setTimeout(() => {
			if (!$userLocation.loaded) {
				handleMapStatus("timeout"); // set the status message to couldnt load map
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
    if (status == "timeout") {
      showError = true;
      showLoading = false;
    }
  }

	// function createLocationMarker() {
	//   const options = {
	//     radius: 10,
	//     color: 'lightblue',
	//     fillColor: 'blue',
	//     fillOpacity: 0.8
	//   };

	//   const r = options.radius;
	//   const s = r;
	//   const s2 = s * 2;
	//   const svg =
	//     `<svg xmlns="http://www.w3.org/2000/svg" width="${s2}" height="${s2}" version="1.1" viewBox="-${s} -${s} ${s2} ${s2}">` +
	//     '<circle r="' +
	//     r +
	//     '" style="' +
	//     `stroke:${options.color};fill:${options.fillColor};fill-opacity:${options.fillOpacity};` +
	//     '" />' +
	//     '</svg>';

	//   const locationIcon = L.divIcon({
	//     className: "leaflet-control-locate-location",
	//     html: svg,
	//     iconSize: [s2, s2]
	//   });

	//   return L.marker(latlng, { icon: locationIcon });
	// }
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
		integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
		crossorigin=""
	/>
</svelte:head>
<div id="mapContainer" style="height: 600px; width: 100%">
	{#if showError}
		<h1>Could not load map</h1>
	{/if}
	{#if showLoading}
		<h1>Loading Map...</h1>
	{/if}
</div>

<button on:click={centerMap}>Center</button>
