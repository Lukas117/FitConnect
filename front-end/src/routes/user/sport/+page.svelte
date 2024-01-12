<script>
  import SideBar from "$lib/SideBar.svelte";
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




