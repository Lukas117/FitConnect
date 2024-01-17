<script>
	// import { navigate } from 'svelte-routing';
	import iconforlogin from '$lib/assets/iconforlogin.png';
	import TitleComponent from "$lib/Title/TitleComponent.svelte";

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
				const data = await response.json();
				console.log(data);

				if (data) {
					const token = data.token;
					document.cookie = `token=${token}; path=/`;
					window.location.href = '/map';
				}
			} else {
				const errorData = await response.json();
				errorMessage = errorData.error;
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}
</script>

<title>Login</title>

<TitleComponent title="LOGIN" enableSideBar={false} />

<div
	class="flex flex-col items-center justify-center min-h-screen
  bg-gradient-to-b from-gray-100 to-gray-300"
>
	<section>
		<img alt="The user" src={iconforlogin} class="w-40 h-40 mb-4" />
	</section>
	<form on:submit={handleLogin} class="max-w-md w-full px-10 py-4">
		{#if errorMessage}
			<p class="text-red-500 mb-4">{errorMessage}</p>
		{/if}
		<div class="mb-4">
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
			<!--{#if errorMessage}-->
			<!--	<p class="text-red-500 mb-4">{errorMessage}</p>-->
			<!--{/if}-->
			<label for="password" class="block text-gray-700 mb-1">
				Password:
			</label>
			<input
				type="password"
				id="password"
				bind:value={password}
				required
				class="w-full px-3 py-2 border border-gray-300 rounded-md"
			/>
		</div>

		<div class="text-right mb-2">
			<a href="/forgot-password" class="text-blue-500">
				Forgot password?
			</a>
		</div>

		<div class="flex flex-col items-center w-full mt-12">
			<button
				type="submit"
				class="text-2xl bg-primary text-white px-10 py-2
         rounded-md mb-4"
			>
				Log in
			</button>
			<button type="submit" class="p">
				<a href="/user/register"> Create an account </a>
			</button>
		</div>
	</form>
</div>
