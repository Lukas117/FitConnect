<script>
    
import { userLocation } from "../stores";
import { onMount } from "svelte";

// options for geolocation api functioons
const locationOptions = {
    enableHighAccuracy: false,
    timeout: 500,
    maximumAge: 5,
};

//updates position of the store
function positionUpdated(position){
    // console.log('Position updated:', position.coords);
    const { latitude, longitude, accuracy } = position.coords;
    userLocation.set({latitude, longitude, accuracy});
}

// calls the functions after the dom is loaded
onMount(() => {
    window.navigator.geolocation.getCurrentPosition(positionUpdated, null, locationOptions);
    // start watching for position changes
    const watchId = window.navigator.geolocation.watchPosition(positionUpdated, null, locationOptions);
});

</script>
  
<h1>Latitude: {$userLocation.latitude}</h1>
<h1>Longitude: {$userLocation.longitude}</h1>
<h1>Accuracy: {$userLocation.accuracy}</h1>