<script>
    import { onMount } from 'svelte';
    import { userLocation } from '../stores';

    let map;
    let showError = false;

    onMount(async () => {
      if (typeof window !== 'undefined') {
        const L = await import('leaflet');
        await import('leaflet.locatecontrol');
        await import('leaflet.locatecontrol/dist/L.Control.Locate.min.css');

        if (Object.keys($userLocation).length === 0) {
          showError = true;
        }

        else {
        map = L.map('mapContainer').setView([$userLocation.latitude, $userLocation.longitude], 17);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(map);

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

  //center the map button handling fucntiong
  function centerMap() {
    console.log('button was pressed');
    if (map) {
      map.flyTo([$userLocation.latitude, $userLocation.longitude], 16);
    }
  }

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