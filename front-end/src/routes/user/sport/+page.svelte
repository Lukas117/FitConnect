<script>

  import { checkAuth } from '$lib/auth.js';
  import TitleComponent from "$lib/Title/TitleComponent.svelte";
  import {onMount} from "svelte";
  import {navigate} from "svelte-routing";
  import Loading from "$lib/Loading.svelte";

  let chosenSports = [];
  let sportList = [];
  let isWarningVisible = false;
  let userId;
  let showError = false;
  let showLoading = true;

  onMount(async () => {
    // handlePageStatus(sportList.length === 0);
    await checkAuth(fetch)
      .then(result => {
        userId = result;
        console.log('Authentication successful:', result);
      })
      .catch(error => {
        console.error('Authentication error:', error);
        navigate('/user/login');
        window.location.reload();
      });

    await getSports();
  });

  async function getSports() {
  	try {
  		const response = await fetch('http://localhost:3014/sports', {
  			method: 'GET',
  			headers: {
  				'Content-Type': 'application/json'
  			}
  		});

  		sportList = await response.json();

  	} catch (error) {
  		console.error('Error fetching sports:', error);
  	}
    handlePageStatus({loaded: true})
  }

  function chooseSport(sport) {
  	if (!chosenSports.includes(sport)) {
  		chosenSports = [...chosenSports, sport];
  	} else {
  		chosenSports = chosenSports.filter(s => s !== sport);
  	}
  }

  async function setSportToUser() {
  	if (chosenSports.length === 0) {
      isWarningVisible = true;
    }
    else {
      try {
        const idList = chosenSports.map(item => item.sport_id);
        const response = await fetch('http://localhost:3010/addSports', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ idList, userId })        });
        if (response.status === 201) {
          console.log("success")
        } else {
        console.error('Error setting sports. Status:', response.status);
        }
      } catch (error) {
        console.error('Error setting sports:', error);
      }
      isWarningVisible = false;
    }
  }

  function handlePageStatus(status) {
    if (status.loaded === true) {
      // successfully loaded
      showLoading = false;
    }
    if (status.loaded === false) {
      // still loading
      showLoading = true;
    }
  }

</script>

<title>Choose sports</title>

<TitleComponent title="CHOOSE SPORTS" enableSideBar={false}/>


<body class="flex flex-col flex-grow">
    {#if showLoading}
        <Loading />
    {:else}
        <div class="m-5 pt-24 text-2xl pb-20">
            {#if sportList.length === 0}
                <h1 class="text-center font-bold mt-4">
                    No sports available
                </h1>
            {:else}
                {#each sportList as sport (sport.sport_id)}
                    <div class="{chosenSports.includes(sport) ?
                        'bg-red-700' : 'bg-orange-300'}
                     text-white p-3 rounded mt-4">
                        <button class="w-full" on:click={() => chooseSport(sport)}>
                            <div class="pl-2 text-left">
                                {sport.sport_name}
                            </div>
                        </button>
                    </div>
                {/each}
            {/if}
        </div>

        <div class="flex flex-col items-center mt-auto mb-7">
            {#if isWarningVisible}
                <p class="text-red-500 mb-4 text-xl font-bold">
                    Please select at least one sport
                </p>
            {/if}

            <button
                    on:click={setSportToUser}
                    class="text-2xl bg-primary
                    text-white px-8 py-2 rounded-md mb-4">
                START EXERCISING
            </button>
        </div>
    {/if}
</body>
