<script>


  let firstName = "";
  let lastName = "";
  let username = "";
  let birthday = "";
  let email = "";
  let password = "";

  const handleRegister = () => {
    // Implement your registration logic here
    console.log("Registering with:", { firstName, lastName, username, birthday, email, password });

    // Add your registration logic here, e.g., send a request to your server
    // and handle the registration response.
  };


</script>

<main class="flex flex-col justify-center items-center h-screen">
  <h1 class="mb-4">Register</h1>

  <form on:submit|preventDefault={handleRegister} class="max-w-md mx-auto">
    <label for="firstName" class="block mb-2">First Name:</label>
    <input type="text" id="firstName" bind:value={firstName} required class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md" />

    <label for="lastName" class="block mb-2">Last Name:</label>
    <input type="text" id="lastName" bind:value={lastName} required class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md" />

    <label for="username" class="block mb-2">Username:</label>
    <input type="text" id="username" bind:value={username} required class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md" />

    <label for="birthday" class="block mb-2">Birthday:</label>
    <input type="date" id="birthday" bind:value={birthday} required class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md" />

    <label for="email" class="block mb-2">Email:</label>
    <input type="email" id="email" bind:value={email} required class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md" />

    <label for="password" class="block mb-2">Password:</label>
    <input type="password" id="password" bind:value={password} required class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md" />

    <a href="/user/sport">
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition duration-400 ease-in-out">
        Register
      </button>
    </a>
  </form>
</main>
