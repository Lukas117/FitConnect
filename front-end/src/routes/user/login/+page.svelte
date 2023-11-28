<!-- src/routes/Login.svelte -->

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
  
  <main>npm install --save-dev prettier eslint eslint-plugin-prettier eslint-config-prettier
    <h1>Login</h1>
  
    <form on:submit|preventDefault={handleLogin}>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" bind:value={email} required />
      </div>
  
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" bind:value={password} required />
      </div>
  
      <div class="forgot-password">
        <a href="/forgot-password">Forgot password?</a>
      </div>
  
      <button type="submit">Login</button>
    </form>
  </main>
  
  <style>
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
  
    h1 {
      font-size: 2em;
      margin-bottom: 20px;
    }
  
    form {
      max-width: 300px;
      width: 100%;
    }
  
    .form-group {
      margin-bottom: 16px;
    }
  
    label {
      display: block;
      margin-bottom: 8px;
    }
  
    input {
      width: 100%;
      padding: 8px;
      box-sizing: border-box;
    }
  
    .forgot-password {
      margin-top: 8px;
      text-align: right;
    }
  
    a {
      color: #3498db;
      text-decoration: none;
    }
  
    button {
      background-color: #3498db;
      color: white;
      padding: 10px 15px;
      font-size: 1em;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition-duration: 0.4s;
      margin-top: 16px;
    }
  
    button:hover {
      background-color: #2980b9;
    }
  </style>
  
  