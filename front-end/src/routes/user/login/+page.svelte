<script>
	import { navigate } from 'svelte-routing';

	let email = '';
	let password = '';
	let errorMessage = '';

	async function handleLogin() {
		try {
			const response = await fetch('http://localhost:3010/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});

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

		<button
			type="submit"
			class="cta-button bg-primary text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
		>
			Login
		</button>
	</form>
</div>
