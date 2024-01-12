
<script>
	import landingpageimage from '$lib/assets/landingpageimage.png';
</script>

<title>FitConnect</title>

  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
	
		<div class="fixed top-2 w-full bg-white p-4 text-center">
			<h1 class="text-4xl font-bold mb-4">FITCONNECT</h1>
		</div>
	
	<section>
		<img alt="The sports" src={landingpageimage} class="w-50 h-60 mb-4" />
	</section>
  
	<section class="max-w-2xl mx-auto items-center text-center">
	  <p class="text-2xl text-text">
		Discover the incredible features of our platform. The more you engage, the more enjoyable your experience will be.
	  </p>
	</section>
  
	<section class="mt-16">
	  <a href="/user/login">
		<button class="cta-button bg-primary text-white px-8 py-3 text-2xl rounded-md hover:bg-accent transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-primary mr-4">
		  Log In
		</button>
	  </a>
  
	  <a href="/user/register">
		<button class="cta-button bg-orange-200 text-white px-8 py-3 text-2xl rounded-md hover:bg-primary transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-accent">
		  Register
		</button>
	  </a>
	</section>
<!--   
  <p>
	<a href="/map">Map site</a>
  </p> -->
  
  </div>
