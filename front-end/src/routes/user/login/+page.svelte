<script>
  let email = "";
  let password = "";

  const handleLogin = () => {
    // Implement your login logic here
    console.log("Logging in with:", { email, password });

    // Add your authentication logic here, e.g., send a request to your server
    // and handle the authentication response.
  };
</script>

<main class="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-gray-300">
  <h1 class="text-4xl font-bold text-gray-800 mb-8">Login</h1>

  <form on:submit|preventDefault={handleLogin} class="max-w-md w-full">
    <div class="mb-4">
      <label for="email" class="block text-gray-700 mb-1">Email:</label>
      <input type="email" id="email" bind:value={email} required class="w-full px-3 py-2 border border-gray-300 rounded-md" />
    </div>

    <div class="mb-4">
      <label for="password" class="block text-gray-700 mb-1">Password:</label>
      <input type="password" id="password" bind:value={password} required class="w-full px-3 py-2 border border-gray-300 rounded-md" />
    </div>

    <div class="text-right mb-2">
      <a href="/forgot-password" class="text-blue-500">Forgot password?</a>
    </div>

    <button type="submit" class="cta-button bg-primary text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">
      Login
    </button>
  </form>
</main>
