
<script>
  import SideBar from '$lib/SideBar.svelte';
  import NavBar from '$lib/NavBar/NavBar.svelte';
  import { onMount } from 'svelte';

  let user;

    // onMount(async () => { 
        
    //   const res = await fetch('http://localhost:3000/api/user/profile', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer ' + localStorage.getItem('token')
    //     }
    //   });
    // const data = await res.json();
    // user = data;
    // console.log(user);
    // });
    user = {
        name: "John Doe",
        location: "Vlissingen",
        about: "Can we just talk about the poltical and economic situation in the world right now? 🤓🤓🤓🤓🤓",
        sports: "Basketball, Tennis",
        recentActivities: ["Played basketball at the park", "Played tennis at the park"],
        friends: ["Jane Doe", "Bob Smith", "John Smith"]
    }

</scrip
<main>
  <div class="p-4">
    <div class="flex items-center justify-center">
      <div class="h-16 w-16 rounded-full overflow-hidden">

      </div>
    </div>
  
    <div class="text-center mt-2">
      <h2 class="text-lg font-semibold">{user.name}</h2>
      <p class="text-gray-600">{user.location}</p>
    </div>
  
    <div class="mt-4 background-primary">
      <h3 class="text-lg font-semibold">About Me</h3>
      <p>{user.about}</p>
      <h3 class="text-lg font-semibold mt-2">Sports I Like</h3>
      <p>{user.sports}</p>
      <h3 class="text-lg font-semibold mt-2">Age</h3>
      <p>21</p>
    </div>
  
    <div class="mt-4 " style="background-color: #fbf8f9;">
      <h3 class="text-lg font-semibold">Recent Activities</h3>
      <ul>
        {#each user.recentActivities as activity (activity)}
          <li>{activity}</li>
        {/each}
      </ul>
    </div>
  
    <div class="mt-4" style="color: #170c0d;">
      <h3 class="text-lg font-semibold">Friend List</h3>
      <ul>
        {#each user.friends as friend (friend)}
          <li>{friend}</li>
        {/each}
      </ul>
    </div>
  </div>
  
    <NavBar />
</main>