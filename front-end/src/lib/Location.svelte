<script>
    
import { writable } from "svelte/store";
import { onMount } from "svelte";

// options for geolocation api functioons
const locationOptions = {
    enableHighAccuracy: true,
    timeout: 100,
    maximumAge: 0,
};

// Create a writable store for latitude and longitude
const location = writable({ latitude: '', longitude: '' });

//updates position of the store
function positionUpdated(position){
    console.log('Position updated:', position.coords);
    const { latitude, longitude } = position.coords;
    location.set({latitude, longitude});
}

// calls the functions after the dom is loaded
onMount(() => {
    window.navigator.geolocation.getCurrentPosition(positionUpdated, null, locationOptions);
    // start watching for position changes
    const watchId = window.navigator.geolocation.watchPosition(positionUpdated, null, locationOptions);
});

</script>
  
<h1>Latitude: {$location.latitude}</h1>
<h1>Longitude: {$location.longitude}</h1>