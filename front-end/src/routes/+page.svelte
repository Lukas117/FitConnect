<!-- src/routes/Landing.svelte -->

<script>
	// You can add any logic or data if needed
  </script>
  
  <main>
	<header>
	  <h1>Welcome to FitConnection</h1>
	</header>
  
	<section>
	  <p>
		Explore the amazing features of our platform. Here the more you interact the more fun u will have.
	  </p>
	</section>
  
	<section>
	  <button>
		Get Started
	  </button>
	</section>
  </main>
  
  <style>
	main {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  text-align: center;
	  height: 100vh;
	}
  
	header {
	  margin-bottom: 24px;
	}
  
	h1 {
	  font-size: 2.5em;
	  color: #333;
	}
  
	p {
	  font-size: 1.2em;
	  color: #555;
	  max-width: 600px;
	  margin: 0 auto;
	}
  
	button {
	  background-color: #3498db;
	  color: white;
	  padding: 15px 30px;
	  font-size: 1.2em;
	  border: none;
	  border-radius: 50px;
	  cursor: pointer;
	  transition-duration: 0.4s;
	  padding-bottom: 10px;
	}
  
	button:hover {
	  background-color: #3498db;
	}
  </style>
  