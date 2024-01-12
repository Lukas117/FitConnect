<script>
  import { navigate } from 'svelte-routing';
  import SideBar from "$lib/SideBar.svelte";
<<<<<<< HEAD
  

  const addSport = async (sport_list) => {
    const url = 'http://localhost:3010/addSports';
    const data = { sport_list };
    let email;
    console.log(data);

    try {
      email = localStorage.getItem('email');
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, sport_list }), 
      });

      const result = await response.json();
      console.log('Response:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const navigateToMap = () => {
    navigate('/map/');
    location.reload();
  };

  let selectedSports = [];

const toggleSport = (sport) => {
  if (selectedSports.includes(sport)) {
    selectedSports = selectedSports.filter(item => item !== sport);
  } else {
    selectedSports = [...selectedSports, sport];
  }
};

const handleNextButtonClick = () => {
  addSport(selectedSports);
  setTimeout(navigateToMap, 400); //idk why it doesnt work without this anymore. it used to work without it
};

</script>

<SideBar />

<div>
<div class="flex flex-col justify-center items-center h-screen bg-gray-100">
  <h1 class="text-2xl mb-4 text-primary">Choose a sport</h1>

  {#each ['Basketball', 'Football', 'Badminton', 'Golf'] as sport}
      <button on:click={() => toggleSport(sport)} class="{selectedSports.includes(sport) ? 'active-sport-button' : 'sport-button'} bg-primary text-white w-24 h-10 rounded-md m-2 transition duration-400 ease-in-out hover:bg-accent active:bg-gray-700">{sport}</button>
    {/each}

  <button on:click={handleNextButtonClick} class="next-button bg-transparent border border-primary text-primary w-24 h-10 rounded-md m-2 transition duration-400 ease-in-out hover:bg-primary hover:text-white focus:outline-none">Next</button>
</div>
</div>
=======
  import logotenis from "$lib/assets/logotenis.png";
  import logobaseball from "$lib/assets/logobaseball.png";
  import logofootball from "$lib/assets/logofootball.png";
  import logo from "$lib/assets/logo.png";
</script>

<SideBar/>

<div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
  <div class="fixed top-2 w-full bg-white p-4 text-center">
    <h1 class="text-4xl font-bold">Choose a Sport</h1> <!-- Reduce the margin here -->
  </div>

  <a href="/map/">
    <!-- Display logo above the first button -->
    
    <button class="sport-button flex items-center bg-orange-300 text-white text-3xl w-60 h-16 rounded-md m-2 transition duration-400 ease-in-out hover:bg-accent">
      {#if logo}
        <img src={logo} alt="Logo" class="w-10 h-10 mr-4 ml-4" /> <!-- Logo inside the button -->
      {/if}
      Basketball
    </button>
  </a>
  
  <!-- Repeat the pattern for other buttons -->
  <button class="sport-button flex items-center bg-orange-300 text-white text-3xl w-60 h-16 rounded-md m-2 transition duration-400 ease-in-out hover:bg-accent">
    {#if logofootball}
      <img src={logofootball} alt="Logo" class="w-10 h-10 mr-4 ml-4" /> <!-- Logo inside the button -->
    {/if}
    Football
  </button>
  <button class="sport-button flex items-center bg-orange-300 text-white text-3xl w-60 h-16 rounded-md m-2 transition duration-400 ease-in-out hover:bg-accent">
    {#if logotenis}
      <img src={logotenis} alt="Logo" class="w-10 h-10 mr-4 ml-4" /> <!-- Logo inside the button -->
    {/if}
    Tenis
  </button>
  <button class="sport-button flex items-center bg-orange-300 text-white text-3xl w-60 h-16 rounded-md m-2 transition duration-400 ease-in-out hover:bg-accent">
    {#if logobaseball}
      <img src={logobaseball} alt="Logo" class="w-10 h-10 mr-4 ml-4" /> <!-- Logo inside the button -->
    {/if}
    Baseball
  </button>

  <div class="flex justify-center">
    <button type="submit" class="cta-button text-2xl bg-primary text-white px-12 py-2 mt-40 rounded-md transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 mb-4">
      Confirm
    </button>
  </div>
</div>




>>>>>>> develop
