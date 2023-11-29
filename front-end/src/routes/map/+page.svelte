<script>
    import Map from "$lib/Map.svelte";
    import Location from "$lib/Location.svelte";
  </script>
  
  <main>
    <div class="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg">
      <Map class="w-3/5 h-2/5 mb-4" />
      <Location />
    </div>
  </main>
  
  