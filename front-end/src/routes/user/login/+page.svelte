<script>
	import { navigate } from 'svelte-routing';
	import LoginIcon from '$lib/assets/iconforlogin.png';
	import TitleComponent from "$lib/Title/TitleComponent.svelte";

	let email = '';
	let password = '';

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

<title>Log in</title>

<TitleComponent title="LOG IN" enableSideBar={false}/>

<body class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">

	<section>
		<img alt="user" src={LoginIcon} class="w-40 h-40 mb-4" />
	</section>

	<form on:submit={handleLogin} class="max-w-md w-full px-10 py-4">

		<div class="mb-4">
			<label for="email" class="text-xl">Email:</label>
			<input
				type="email"
				id="email"
				bind:value={email}
				required
				class="w-full px-16 py-2 border border-gray-300 rounded-md"
			/>
		</div>

		<div class="mb-4">
			<label for="password" class="text-xl">Password:</label>
			<input
				type="password"
				id="password"
				bind:value={password}
				required
				class="w-full px-3 py-2 border border-gray-300 rounded-md"
			/>
		</div>

		<div class="text-right mb-2">
			<a
				href="/forgot-password"
				class="text-blue-500"
			>
				Forgot password?
			</a>
		</div>

		<div class="flex flex-col items-center w-full mt-12 ">
			<button
				type="submit"
				class="bg-primary text-white px-14 py-2 text-2xl rounded-md"
			>
				Log in
			</button>
			<button type="submit" class="text-xl mt-4">
				<a href="/user/register">Create an account</a>
			</button>
		</div>
	</form>

</body>
