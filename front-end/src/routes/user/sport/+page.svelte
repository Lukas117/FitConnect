<script>
  import SideBar from "$lib/SideBar.svelte";
</script>

<SideBar/>
  <!-- Other content goes here -->
  <div class="flex flex-col justify-center items-center h-screen bg-background">
    <h1 class="text-2xl mb-4" style="primary;">Choose a sport</h1>
    <a href="/map/">
      <button class="sport-button bg-primary text-white w-24 h-10 rounded-md m-2 transition duration-400 ease-in-out hover:bg-accent">Basketball</button>
    </a>
    <button class="sport-button bg-primary text-white w-24 h-10 rounded-md m-2 transition duration-400 ease-in-out hover:bg-accent">Football</button>
    <button class="sport-button bg-primary text-white w-24 h-10 rounded-md m-2 transition duration-400 ease-in-out hover:bg-accent">Badminton</button>
    <button class="sport-button bg-primary text-white w-24 h-10 rounded-md m-2 transition duration-400 ease-in-out hover:bg-accent">Golf</button>
  </div>
