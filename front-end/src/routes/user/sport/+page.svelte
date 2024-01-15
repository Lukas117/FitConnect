<script>
  import { navigate } from 'svelte-routing';
  import SideBar from "$lib/SideBar.svelte";
  import logotenis from "$lib/assets/logotenis.png";
  import logobaseball from "$lib/assets/logobaseball.png";
  import logofootball from "$lib/assets/logofootball.png";
  import logo from "$lib/assets/logo.png";
	import { onMount } from 'svelte';
  import { checkAuth } from '$lib/auth.js';


  let userId;
  
  onMount(() => {
    checkAuth(fetch)
      .then(result => {
        userId = result;
        console.log('Authentication successful:', result);  
      })
      .catch(error => {
        console.error('Authentication error:', error);
        navigate('/user/login');
        window.location.reload();
      });
  });



  const addSport = async () => {
    const url = 'http://localhost:3010/addSports';
    const email = localStorage.getItem('email');
    const data = { email, selectedSports };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('Response:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  let selectedSports = [];

  const toggleSport = (sport) => {
    if (selectedSports.includes(sport)) {
      selectedSports = selectedSports.filter(item => item !== sport);
    } else {
      selectedSports = [...selectedSports, sport];
    }
  };

  const confirmSelection = () => {
    console.log(selectedSports);
    addSport();
  };
</script>

<SideBar/>

<div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
  <div class="fixed top-2 w-full bg-white p-4 text-center">
    <h1 class="text-4xl font-bold">Choose a Sport</h1> <!-- Reduce the margin here -->
  </div>
    
    <button  on:click={toggleSport.bind(null, 'Basketball')} class="sport-button flex items-center bg-orange-300 text-white text-3xl w-60 h-16 rounded-md m-2 transition duration-400 ease-in-out hover:bg-accent">
      {#if logo}
        <img src={logo} alt="Logo" class="w-10 h-10 mr-4 ml-4" /> <!-- Logo inside the button -->
      {/if}
      Basketball
    </button>
  
  <!-- Repeat the pattern for other buttons -->
  <button  on:click={toggleSport.bind(null, 'Footbal')} class="sport-button flex items-center bg-orange-300 text-white text-3xl w-60 h-16 rounded-md m-2 transition duration-400 ease-in-out hover:bg-accent">
    {#if logofootball}
      <img src={logofootball} alt="Logo" class="w-10 h-10 mr-4 ml-4" /> <!-- Logo inside the button -->
    {/if}
    Football
  </button>
  <button  on:click={toggleSport.bind(null, 'Tennis')} class="sport-button flex items-center bg-orange-300 text-white text-3xl w-60 h-16 rounded-md m-2 transition duration-400 ease-in-out hover:bg-accent">
    {#if logotenis}
      <img src={logotenis} alt="Logo" class="w-10 h-10 mr-4 ml-4" /> <!-- Logo inside the button -->
    {/if}
    Tennis
  </button>
  <button  on:click={toggleSport.bind(null, 'Baseball')} class="sport-button flex items-center bg-orange-300 text-white text-3xl w-60 h-16 rounded-md m-2 transition duration-400 ease-in-out hover:bg-accent">
    {#if logobaseball}
      <img src={logobaseball} alt="Logo" class="w-10 h-10 mr-4 ml-4" /> <!-- Logo inside the button -->
    {/if}
    Baseball
  </button>

  <div class="flex justify-center">
    <a href="/map/">

    <button on:click={confirmSelection} class="cta-button text-2xl bg-primary text-white px-12 py-2 mt-40 rounded-md transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 mb-4">
      Confirm
    </button>
    </a>
  </div>
</div>




