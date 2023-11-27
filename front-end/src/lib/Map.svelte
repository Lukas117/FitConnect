<script>
  import { onMount } from 'svelte';
  import { markerList, userLocation } from '../store';

  let map;
  let showError = false;
  let eventMarkersLayer;

  onMount(async () => {
    if (typeof window !== 'undefined') {
      const L = await import('leaflet');
      await import('leaflet.locatecontrol');
      await import('leaflet.locatecontrol/dist/L.Control.Locate.min.css');

      if (Object.keys($userLocation).length === 0) {
        showError = true;
      } else {
        map = L.map('mapContainer').setView([$userLocation.latitude, $userLocation.longitude], 17);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(map);

        eventMarkersLayer = L.layerGroup().addTo(map);
        updateMarkers();

        const lc = L.control
                .locate({
                  flyTo: true,
                  strings: {
                    title: "Show my location",
                  },
                  locateOptions: {
                    enableHighAccuracy: true
                  }
                }).addTo(map);

        lc.start();
      }
    }
  });

  userLocation.subscribe(value => {
    if (map) {
      console.log('User location changed:', value);
    }
  });

  // center the map button handling function
  function centerMap() {
    console.log('button was pressed');
    if (map) {
      map.flyTo([$userLocation.latitude, $userLocation.longitude], 16);
    }
  }

  // create new event
  function createEvent() {
    console.log('Create event button was pressed');
    const newMarker = {
      id: $markerList.length + 1,
      lat: 51.4555 + Math.random() * 0.01,
      lng: 3.56655 - Math.random() * 0.01,
      title: `New Marker ${$markerList.length + 1}`,
      content: `This is a new marker.`
    };

    // update the store by pushing the new marker
    markerList.update(existingMarkers => [...existingMarkers, newMarker]);
  }

  // function to update markers on the map
  function updateMarkers() {
    if (map) {
      // clear existing markers
      eventMarkersLayer.clearLayers();

      // add markers from the store array
      $markerList.forEach(markerData => {
        const marker = L.marker([markerData.lat, markerData.lng]).addTo(map);
        marker.bindPopup(`<b>${markerData.title}</b><br>${markerData.content}`);
        eventMarkersLayer.addLayer(marker);
      });
    }
  }

  // subscribe to changes in the markerList store and update markers
  markerList.subscribe(value => {
    if (map) {
      console.log('Marker added', value);
      updateMarkers();
    }
  });

</script>

<svelte:head>
  <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossorigin=""
  />
</svelte:head>

<div id="mapContainer" style="height: 400px; width: 50%">
  {#if showError}
    <h1> Could not load map </h1>
  {/if}
</div>

<button on:click={centerMap}>Center</button>
<button on:click={createEvent}>Create event</button>
