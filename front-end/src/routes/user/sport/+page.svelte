<script>
  let isSidebarOpen = false;

  const toggleSidebar = () => {
    isSidebarOpen = !isSidebarOpen;
  };

  const closeSidebar = () => {
    isSidebarOpen = false;
  };
</script>

<main class="flex flex-col justify-center items-center h-screen bg-background relative">
  <div class="absolute top-0 right-0 m-4">
    <!-- Hamburger Icon for Sidebar Toggle -->
    <button 
      class="text-3xl cursor-pointer"
      on:click={toggleSidebar}
    >
      &#x2630;
    </button>

    <!-- Account Sidebar -->
    {#if isSidebarOpen}
      <div class="fixed top-0 right-0 h-screen w-1/3 bg-white shadow-md p-4 z-10">
        <!-- Sidebar content goes here -->
        <p class="block px-4 py-2 text-gray-800 hover:bg-gray-200" >Profile</p>
        <p class="block px-4 py-2 text-gray-800 hover:bg-gray-200" on:click={closeSidebar}>Settings</p>
        <p class="block px-4 py-2 text-gray-800 hover:bg-gray-200" on:click={closeSidebar}>Logout</p>
      </div>
    {/if}
  </div>

  <!-- Other content goes here -->
  <main class="flex flex-col justify-center items-center h-screen bg-background">
    <h1 class="text-2xl mb-4" style="primary;">Choose a sport</h1>
    <a href="/map/">
      <button class="sport-button bg-primary text-white w-24 h-10 rounded-md m-2 transition duration-400 ease-in-out hover:bg-accent">Basketball</button>
    </a>
    <button class="sport-button bg-primary text-white w-24 h-10 rounded-md m-2 transition duration-400 ease-in-out hover:bg-accent">Football</button>
    <button class="sport-button bg-primary text-white w-24 h-10 rounded-md m-2 transition duration-400 ease-in-out hover:bg-accent">Badminton</button>
    <button class="sport-button bg-primary text-white w-24 h-10 rounded-md m-2 transition duration-400 ease-in-out hover:bg-accent">Golf</button>
  </main>
</main>