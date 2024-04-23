<template>
    <div class="container">
      <header>
        <!-- ... -->
      </header>
      <p class="welcome">Welcome to Paul's InfoBoard, here you can check the current weather anywhere in the world, schedule your events on a calendar, 
        and relax, and stop worrying about all of the upcoming things in your life! Thanks for stopping by! </p>
      <div class="image-container">
        <img src="@/assets/infoboard_retouch.jpeg" alt="Welcome Paul" class="welcome-image">
      </div>
      <main>
        <router-view />
      </main>
      <footer>
        <!-- ... -->
      </footer>
    </div>
  </template>
  
  <style>
  /* ... other styles ... */
  
  .container {
    display: flex;
    flex-direction: column;
    align-items: center; /* Centers content horizontally */
    justify-content: center; /* Centers content vertically */
    min-height: 100vh;
    text-align: center; /* Aligns text center */
  }
  
  .welcome {
  font-family: Arial, sans-serif;
  color: rgb(21, 22, 22);
  font-weight: bold;
  padding: 15px; 
  background-size: cover;
  border-radius: 10px;
  }
  
  .image-container {
    margin-top: 20px; 
  }
  
  .welcome-image {
    max-width: 50%; /* Adjust the maximum width of the image */
    height: auto;
    border-radius: 10px; /* Adjust the border radius if needed */
  }
  
  
  </style>
  