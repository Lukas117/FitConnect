<script>
    import { onMount } from 'svelte';
    import { userLocation } from '../stores';

    let map;

    onMount(async () => {
    if (typeof window !== 'undefined') {
      const L = await import('leaflet');
      await import('leaflet.locatecontrol');
      await import('leaflet.locatecontrol/dist/L.Control.Locate.min.css');

      map = L.map('mapContainer').setView([$userLocation.latitude, $userLocation.longitude], 17);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      L.control.locate().addTo(map);
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
<div id="mapContainer" style="height: 400px; width: 50%" />

<button on:click={centerMap}>Center</button>