<script>
  import LandingPageImage from '$lib/assets/landingpageimage.png';
  import TitleComponent from "$lib/Title/TitleComponent.svelte";
  import {navigate} from "svelte-routing";

  function goToFaq() {
    navigate('/faq');
    location.reload();
  }

  function goToLogin() {
    navigate('/user/login');
    location.reload();
  }

  function goToRegister() {
    navigate('/user/register');
    location.reload();
  }

</script>

<title>FitConnect</title>

<TitleComponent title="FITCONNECT" enableSideBar={false}/>

<body class="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">

    <section>
        <button on:click={goToFaq} class="mt-24 ml-72 bg-orange-300 text-white px-6 py-2 text-xl rounded-md">
            FAQ
        </button>
    </section>


    <section>
        <img alt="The sports" src={LandingPageImage} class="w-50 h-60 mb-5 mt-14"/>
    </section>

    <section class="max-w-2xl p-5 text-center">
        <p class="text-2xl">
            Discover the incredible features of our platform such as locating sport events in your area.
            The more you engage, the more enjoyable your experience will be.
        </p>
    </section>

    <div class="mt-auto mb-10">
        <section>
            <button on:click={goToLogin} class="bg-primary text-white px-16 py-3 text-2xl rounded-md">
                Log In
            </button>
        </section>

        <section class="mt-4">
            <button on:click={goToRegister} class="bg-red-700 text-white px-14 py-3 text-2xl rounded-md">
                Sign up
            </button>
        </section>
    </div>

</body>

