<script>
    let userLocation = null;
  
    async function getuserLocation() {
      try {
        const userLocation  = await new Promise((resolve, reject) => { 
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        return userLocation;
      } 
      catch (error) {
        console.log(error);
      }
    }

  </script>
  