<!-- src/layout/Layout.svelte -->

<script>
    // You can add any logic or data for the navbar here
  </script>
  
  <header>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <!-- Add more navigation links as needed -->
      </ul>
    </nav>
  </header>
  
  <main>
    <!-- The content of the specific page will go here -->
    <slot></slot>
  </main>
  
  <style>
    header {
      background-color: #333;
      color: white;
      padding: 10px;
      text-align: center;
    }
  
    nav {
      display: flex;
      justify-content: center;
    }
  
    ul {
      list-style: none;
      display: flex;
      padding: 0;
    }
  
    li {
      margin: 0 15px;
    }
  
    a {
      text-decoration: none;
      color: white;
      font-weight: bold;
    }
  
    main {
      padding: 20px;
    }
  </style>
  