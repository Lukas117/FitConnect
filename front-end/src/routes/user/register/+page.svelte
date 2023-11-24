<!-- src/routes/Register.svelte -->

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
  
  <main>
    <h1>Register</h1>
  
    <form on:submit|preventDefault={handleRegister}>
      <label for="firstName">First Name:</label>
      <input type="text" id="firstName" bind:value={firstName} required />
  
      <label for="lastName">Last Name:</label>
      <input type="text" id="lastName" bind:value={lastName} required />
  
      <label for="username">Username:</label>
      <input type="text" id="username" bind:value={username} required />
  
      <label for="birthday">Birthday:</label>
      <input type="date" id="birthday" bind:value={birthday} required />
  
      <label for="email">Email:</label>
      <input type="email" id="email" bind:value={email} required />
  
      <label for="password">Password:</label>
      <input type="password" id="password" bind:value={password} required />
  
      <button type="submit">Register</button>
    </form>
  </main>
  
  <style>
    main {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
  
    h1 {
      margin-bottom: 16px; /* Add some spacing below the heading */
    }
  
    form {
      max-width: 300px;
      margin: auto;
    }
  
    label {
      display: block;
      margin-bottom: 8px;
    }
  
    input {
      width: 100%;
      padding: 8px;
      margin-bottom: 16px;
      box-sizing: border-box;
    }
  
    button {
      background-color: #3498db;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  
    button:hover {
      background-color: #3498db;
    }
  </style>
  