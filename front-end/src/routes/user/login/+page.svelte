<script>
<<<<<<< HEAD
	import { navigate } from 'svelte-routing';

	let email = '';
	let password = '';
	let errorMessage = '';
=======
  import { navigate } from "svelte-routing";
  import iconforlogin from '$lib/assets/iconforlogin.png';

  let email = '';
  let password = '';
>>>>>>> develop

	async function handleLogin() {
		try {
			const response = await fetch('http://localhost:3010/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});

<<<<<<< HEAD
			if (response.ok) {
				// Handle successful login
				const data = await response.json();
				if (data) {
					localStorage.setItem('email', email);
					navigate('/user/sport');
					location.reload();
				}
			} else {
				// Handle login failure
				const errorData = await response.json();
				errorMessage = errorData.error;
			}
		} catch (error) {
			console.error('Error during login:', error);
		}
	}
</script>

<div
	class="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-gray-300"
>
	<h1 class="text-4xl font-bold text-gray-800 mb-8">Login</h1>

	<form on:submit={handleLogin} class="max-w-md w-full">
		<div class="mb-4">
			{#if errorMessage}
				<p class="text-red-500 mb-4">{errorMessage}</p>
			{/if}
			<label for="email" class="block text-gray-700 mb-1">Email:</label>
			<input
				type="email"
				id="email"
				bind:value={email}
				required
				class="w-full px-3 py-2 border border-gray-300 rounded-md"
			/>
			<!-- Change type to 'email' and id to 'email' -->
		</div>
=======
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data) {
          navigate('/map');
          location.reload();
        }
      } else {
        const errorData = await response.json();
        console.error(errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
  <div class="fixed top-2 w-full bg-white p-4 text-center">
    <h1 class="text-4xl font-bold mb-4">Login</h1>
  </div>
  
  <section>
    <img alt="The user" src={iconforlogin} class="w-40 h-40 mb-4" />
  </section>
  <form on:submit={handleLogin} class="max-w-md w-full px-10 py-4">
    <div class="mb-4">  
      <label for="email" class="block text-gray-700 mb-1">Email:</label>
      <input type="email" id="email" bind:value={email} required class="w-full px-16 py-2 border border-gray-300 rounded-md" /> <!-- Change type to 'email' and id to 'email' -->
    </div>
>>>>>>> develop

		<div class="mb-4">
			{#if errorMessage}
				<p class="text-red-500 mb-4">{errorMessage}</p>
			{/if}
			<label for="password" class="block text-gray-700 mb-1">Password:</label>
			<input
				type="password"
				id="password"
				bind:value={password}
				required
				class="w-full px-3 py-2 border border-gray-300 rounded-md"
			/>
		</div>

		<div class="text-right mb-2">
			<a href="/forgot-password" class="text-blue-500">Forgot password?</a>
		</div>

<<<<<<< HEAD
		<button
			type="submit"
			class="cta-button bg-primary text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
		>
			Login
		</button>
	</form>
=======
    <div class="flex flex-col items-center w-full mt-12">
      <button type="submit" class="cta-button text-2xl bg-primary text-white px-12 py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 mb-4">
        Login
      </button>
      <button type="submit" class="p">
        <a href="/user/register">
          Create an account
        </a>
      </button>
    </div>
    
  </form>
>>>>>>> develop
</div>
