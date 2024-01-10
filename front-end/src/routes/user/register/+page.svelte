<script>
  import { navigate } from 'svelte-routing';

  let firstName = "";
  let lastName = "";
  let user_name = "";
  let birth_date = "";
  let email = "";
  let password_hash = "";

  const handleRegister = async () => {
  	const registrationData = {
  		name: `${firstName} ${lastName}`,
  		user_name,
  		birth_date,
  		email,
  		password_hash,
  	};

  	try {
  		const response = await fetch('http://localhost:3010/register', {
  			method: 'POST',
  			headers: {
  				'Content-Type': 'application/json',
  			},
  			body: JSON.stringify(registrationData),
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

<main class="flex flex-col justify-center items-center h-screen">
  <h1 class="mb-4">Register</h1>

  <form on:submit|preventDefault={handleRegister} class="max-w-md mx-auto">
    <label for="firstName" class="block mb-2">First Name:</label>
    <input type="text" id="firstName" bind:value={firstName} required class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md" />

    <label for="lastName" class="block mb-2">Last Name:</label>
    <input type="text" id="lastName" bind:value={lastName} required class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md" />

    <label for="user_name" class="block mb-2">Username:</label>
    <input type="text" id="user_name" bind:value={user_name} required class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md" />

    <label for="Birthday" class="block mb-2">Birthday:</label>
    <input type="date" id="birth_date" bind:value={birth_date} required class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md" />

    <label for="email" class="block mb-2">Email:</label>
    <input type="email" id="email" bind:value={email} required class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md" />

    <label for="password" class="block mb-2">password:</label>
    <input type="password_hash" id="password_hash" bind:value={password_hash} required class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md" />

    
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition duration-400 ease-in-out">
        Register
      </button>
  </form>
</main>
