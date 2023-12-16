<script>
    let showOtherEvents = false;
    let showMyEvents = false;
  
    const toggleOtherEvents = () => {
      showOtherEvents = !showOtherEvents;
      showMyEvents = false; // Hide My Events
    };
  
    const toggleMyEvents = () => {
      showMyEvents = !showMyEvents;
      showOtherEvents = false; // Hide Other Events
    };
  </script>
  
  <style>
    .event-container {
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }
  
    .card {
      max-width: 400px;
      padding: 20px;
      background-color: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  </style>
  
  <body class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-4xl font-bold mb-4">EVENTS</h1>
  
    <div class="flex m-4">
      <button class="bg-orange-500 text-white text-xl px-10 py-3 rounded" on:click={toggleOtherEvents}>
        Other Events
      </button>
      <button class="bg-red-500 text-white  text-xl px-10 py-3 rounded ml-2" on:click={toggleMyEvents}>
        My Events
      </button>
    </div>
  
    <div class="card mt-0 text-2xl">
      {#if showOtherEvents}
        <div class="bg-orange-300 text-white p-4 rounded">
          <div class="mt-4 bg-red-700 rounded-md">The best lobby 1</div>
          <div class="mt-3 text-black">Date: 27 of December 19:30</div>
          <div class="mt-3 text-black">Players: 3/8</div>
        </div>
      {/if}
  
      {#if showOtherEvents}
        <div class="bg-orange-300 text-white p-4 rounded mt-4">
          <div class="mt-4 bg-red-700 rounded-md">The best lobby 2</div>
          <div class="mt-3 text-black">Date: 28 of December 20:00</div>
          <div class="mt-3 text-black">Players: 5/10</div>
        </div>
      {/if}
  
      {#if showOtherEvents}
        <div class="bg-orange-300 text-white p-4 rounded mt-4">
          <div class="mt-4 bg-red-700 rounded-md">The best lobby 3</div>
          <div class="mt-3 text-black">Date: 29 of December 21:30</div>
          <div class="mt-3 text-black">Players: 7/12</div>
        </div>
      {/if}

      
  
      {#if showMyEvents}
      <h1 class="mt-1 font-bold">Hosted events </h1>
        <div class="bg-orange-300 text-white p-4 rounded mt-4">
          <div class="mt-4 bg-red-700 rounded-md">My Event 1</div>
          <div class="mt-3 text-black">Date: 29 of December 8:30</div>
          <div class="mt-3 text-black">Players: 10/100</div>
        </div>

        <div class="bg-orange-300 text-white p-4 rounded mt-4">
          <div class="mt-4 bg-red-700 rounded-md">Big balls</div>
          <div class="mt-3 text-black">Date: 1 of January 8:30</div>
          <div class="mt-3 text-black">Players: 2/10</div>
        </div>

      <h1 class="mt-2 font-bold">Joined events</h1>
        <div class="bg-orange-300 text-white p-4 rounded mt-4">
          <div class="mt-4 bg-red-700 rounded-md">My Event 1</div>
          <div class="mt-3 text-black">Date: 29 of December 8:30</div>
          <div class="mt-3 text-black">Players: 10/100</div>
        </div>
    
    
      {/if}
    </div>
  </body>
  
  
  