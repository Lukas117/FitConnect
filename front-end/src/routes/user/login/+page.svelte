<script>
  import { navigate } from "svelte-routing";
  import iconforlogin from '$lib/assets/iconforlogin.png';

  let email = '';
  let password = '';

  async function handleLogin() {
    try {
      const response = await fetch('http://localhost:3010/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), 
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

    <div class="mb-4">
      <label for="password" class="block text-gray-700 mb-1">Password:</label>
      <input type="password" id="password" bind:value={password} required class="w-full px-3 py-2 border border-gray-300 rounded-md" />
    </div>

    <div class="text-right mb-2">
      <a href="/forgot-password" class="text-blue-500">Forgot password?</a>
    </div>

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
</div>
