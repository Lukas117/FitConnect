<script>
    import { onMount } from 'svelte';
  
    let minutes = 40;
    let seconds = 0;
    let interval;
    let isPaused = false;
  
    const updateCountdown = () => {
      // Update countdown logic here
      // For simplicity, I'll decrement each unit every second for demonstration purposes
      if (!isPaused) {
      seconds -= 1;
  
      if (seconds < 0) {
        minutes -= 1;
        seconds = 59;
      }
  
      if (minutes < 0) {
        minutes = 59;
      }
    }
  
    };
  
    onMount(() => {
      const interval = setInterval(updateCountdown, 1000);
  
      return () => {
        clearInterval(interval);
      };
    });

    let number1 = 0;
    let number2 = 0;

    const handleClick1 = () => {
      number1 += 2;
      
    };
    const handleClick2 = () => {
      
      number2 += 2;
    };


    const togglePause = () => {
      isPaused = !isPaused;
      // Add logic for pausing/resuming functionality as needed
    };

</script>

<style>
  .triangle-button {
    clip-path: polygon(100% 0%, 0% 50%, 100% 100%);
  }
</style>

  <body>
    <div>
      <h1 class="text-center font-extralight text-4xl ">LIVESCORE</h1>
    </div>
    <div class="grid grid-flow-col gap-5 text-center auto-cols-max justify-center">
      <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content items-center">
        <span class="countdown font-mono text-5xl">{minutes}</span> min
      </div>
      <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content items-center">
        <span class="countdown font-mono text-5xl">{seconds}</span> sec
      </div>
    </div>
  
    <div class="flex">
      <div class="flex-grow h-32 bg-white rounded-box flex items-center justify-center relative">
        <div class="card">TEAM 1</div>
      </div>
      <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-[50vh] bg-gray-600"></div>
      <div class="border-r mx-2"></div>
  
      <div class="flex-grow h-32 bg-base-300 rounded-box flex items-center justify-center relative">
        <div class="card">TEAM 2</div>
        
      </div>
    </div>
  
    <div class="flex">
      <div
        on:click={handleClick1}
        class="flex-grow h-32 bg-white rounded-box flex items-center justify-center relative mt-23"
      >
        
        <div class="w-40 h-40 bg-primary rounded-full flex text-white">
          <span class="text-7xl pt-0 m-auto">{number1}</span>
        </div>
      </div>
  
      <div class="border-r mx-2"></div>
  
      <div
        on:click={handleClick2}
        class="flex-grow h-32 bg-base-300 rounded-box flex items-center justify-center relative mt-23"
      >
        
        <div class="w-40 h-40 bg-primary rounded-full flex items-center justify-center text-white cursor-pointer mx-auto">
          <span class="text-7xl">{number2}</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center mt-80">
      <button
        on:click={togglePause}
        class={`bg-primary text-white px-4 py-2 transition-transform duration-300 ease-in-out ${
          isPaused ? 'triangle-button transform -rotate-180 px-4 py-4' : ''
        }`}
      >
        {isPaused ? '' : 'Pause'}
      </button>
      
    </div>
    
  </body>
  