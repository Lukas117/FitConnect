<script>
	import { navigate } from 'svelte-routing';
	import TitleComponent from "$lib/Title/TitleComponent.svelte";

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

<title>Sign up</title>

<TitleComponent title="SIGN UP" enableSideBar={false} />

<body class="flex flex-col items-center min-h-screen
	bg-gradient-to-b from-gray-100 to-gray-300"
>

    <form on:submit|preventDefault={handleRegister}
	    class="h-full px-10 mt-24">

        <label for="firstName" class="text-xl">First Name:</label>
		<input
			type="text"
			id="firstName"
			bind:value={firstName}
			required
			class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
		/>

		<label for="lastName" class="text-xl">Last Name:</label>
		<input
			type="text"
			id="lastName"
			bind:value={lastName}
			required
			class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
		/>

		<label for="user_name" class="text-xl">Username:</label>
		<input
			type="text"
			id="user_name"
			bind:value={user_name}
			required
			class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
		/>

		<label for="Birthday" class="text-xl">Birthday:</label>
		<input
			type="date"
			id="birth_date"
			bind:value={birth_date}
			required
			class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
		/>

		<label for="email" class="text-xl">Email:</label>
		<input
			type="email"
			id="email"
			bind:value={email}
			required
			class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
		/>

		<label for="password" class="text-xl">Password:</label>
		<input
			type="password"
			id="password_hash"
			bind:value={password_hash}
			required
			class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
		/>

        <div class="flex justify-center pt-52">
            <button
				type="submit"
				class="text-2xl bg-primary text-white px-8 py-2 rounded-md">
                	Create account
            </button>
        </div>
	</form>
</body>
