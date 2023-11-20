<script>
    import { onMount } from 'svelte';

    let map;
  
    onMount(() => {
      if (typeof window !== 'undefined') {
        // Leaflet code that depends on the DOM
        import('leaflet').then((L) => {
          map = L.map('mapContainer').setView([51.505, -0.09], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }).addTo(map);
        });
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

<div id="mapContainer" style="height: 400px; width: 50%" />
