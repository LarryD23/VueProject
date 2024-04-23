<template>
    <div>
      <header>
        
        <h1>InfoBoard</h1>
        
        <nav>
          <ul class = "nav-links">
            <li><router-link to="/WelcomeView">Welcome</router-link></li>
            <li><router-link to="/WeatherView">Weather</router-link></li>
            <li><router-link to="/CalendarView">Calendar</router-link></li>
            <li><router-link to="/AboutView">About</router-link></li>
            
           
          </ul>
        </nav>
      </header>
  
      
      <main>
        <router-view /> 
      </main>
  
      <footer>
       
        <p>&copy; 2023 Diamond Dash Enterprises. All rights reserved.</p>
      </footer>
    </div>
  </template>
  

  
  <style>

body {
    font-family: Arial, sans-serif;
    background-color: #f2f2f2;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh; 
  }

  main {
    flex: 1; 
  }

header {
  background-color: rgb(119, 146, 220);
  color: #fff;
  padding: 10px 20px;
}

.nav-links {
  list-style: none;
  padding: 0;
  display: flex;
}

.nav-links li {
  margin-right: 20px;
}

.nav-links li a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  padding: 8px 12px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-links li a:hover,
.nav-links li a.router-link-active {
  background-color: #ccc;
  color: #fff;
}

footer {
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
    margin-top: auto; /* Push the footer to the bottom */
  }
  
</style>
