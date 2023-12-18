<script>
  import { navigate } from 'svelte-routing';
  import SideBar from "$lib/SideBar.svelte";
  

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
  navigateToMap();
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