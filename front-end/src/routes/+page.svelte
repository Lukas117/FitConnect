<script>
  import Map from "$lib/Map.svelte";
  // import userLocation from "$lib/Location.svelte";

  async function getuserLocation() {
    try {
      const position = await new Promise((resolve, reject) => { 
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      return position;
    } 
    catch (error) {
      console.log(error);
      } 
    }

  console.log(getuserLocation());
    
    
</script>

<Map/>