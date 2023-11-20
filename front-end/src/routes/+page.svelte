<script>
import Map from "$lib/Map.svelte";

import Location from "$lib/Location.svelte";

// async function getUserLocation() {
//   try {
//       const userLocation  = await new Promise((resolve, reject) => { 
//       navigator.geolocation.getCurrentPosition(resolve, reject);
//     });
//     return userLocation;
//   } 
//   catch (error) {
//     console.log(error);
//   }
// }
// console.log(getUserLocation());

</script>

<Map/>
<Location/>