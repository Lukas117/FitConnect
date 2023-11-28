<!-- src/routes/Landing.svelte -->

<main>
	<header>
	  <h1>Welcome to FitConnection</h1>
	</header>
  
	<section>
	  <p>
		Explore the amazing features of our platform. Here the more you interact, the more fun you will have.
	  </p>
	</section>
  
	<section>
	  <a href="/user/login">
		<button class="login-button">
		  Log In
		</button>
	  </a>
	  <a href="/user/register">
		<button class="register-button">
		  Register
		</button>
	  </a>
	</section>
  
  <p>
	<a href="/map">Map site</a>
  </p>
  
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
  
	.login-button,
	.register-button {
	  background-color: #3498db;
	  color: white;
	  padding: 15px 30px;
	  font-size: 1.2em;
	  border: none;
	  border-radius: 50px;
	  cursor: pointer;
	  transition-duration: 0.4s;
	  margin-right: 10px;
	  margin-bottom: 10px;
	}
  
	.login-button:hover,
	.register-button:hover {
	  background-color: #2980b9;
	}
  </style>
