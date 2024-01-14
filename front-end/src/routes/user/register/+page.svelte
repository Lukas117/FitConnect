<script>
	import { navigate } from 'svelte-routing';

	let firstName = '';
	let lastName = '';
	let user_name = '';
	let birth_date = '';
	let email = '';
	let password_hash = '';

	const handleRegister = async () => {
		const registrationData = {
			name: `${firstName} ${lastName}`,
			user_name,
			birth_date,
			email,
			password_hash
		};

		try {
			const response = await fetch('http://localhost:3010/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(registrationData)
			});

			if (!response.ok) {
				throw new Error('Registration failed');
			}
			// Registration successful, handle the response as needed
			const responseData = await response.json();
			console.log('Registration successful:', responseData);
			if (responseData) {
				navigate('/map');
				location.reload();
			}
		} catch (error) {
			console.error('Error during registration:', error.message);
		}
	};
</script>

<main
	class="flex flex-col items-center 
	justify-center min-h-screen bg-gradient-to-b 
	from-gray-100 to-gray-300"
>
	<div class="fixed top-2 w-full bg-white p-4 text-center">
		<h1 class="text-4xl font-bold mb-4">Register</h1>
	</div>

	<form on:submit|preventDefault={handleRegister} 
	class="max-w-md mx-auto p-10">
		<label for="firstName" class=" mb-2">First Name:</label>
		<input
			type="text"
			id="firstName"
			bind:value={firstName}
			required
			class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
		/>

		<label for="lastName" class=" mb-2">Last Name:</label>
		<input
			type="text"
			id="lastName"
			bind:value={lastName}
			required
			class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
		/>

		<label for="user_name" class=" mb-2">Username:</label>
		<input
			type="text"
			id="user_name"
			bind:value={user_name}
			required
			class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
		/>

		<label for="Birthday" class=" mb-2">Birthday:</label>
		<input
			type="date"
			id="birth_date"
			bind:value={birth_date}
			required
			class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
		/>

		<label for="email" class=" mb-2">Email:</label>
		<input
			type="email"
			id="email"
			bind:value={email}
			required
			class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
		/>

		<label for="password" class=" mb-2">Password:</label>
		<input
			type="password_hash"
			id="password_hash"
			bind:value={password_hash}
			required
			class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
		/>

		<div class="flex justify-center">
			<button
				type="submit"
				class="cta-button text-2xl bg-primary
				text-white px-12 py-2 rounded-md
				transition duration-300 ease-in-out
				hover:bg-blue-700 focus:outline-none
				focus:ring focus:border-blue-300 mt-4"
			>
				Register
			</button>
		</div>
	</form>
</main>
