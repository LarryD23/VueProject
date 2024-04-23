<template>
  <div id="weatherView">
  <main>
    <div class="search-box">
      <input type="text" 
      name="search-box" id="search-box" 
      class="search-bar" 
      placeholder="Enter a city..."
      v-model="q"
      @keypress="fetchWeather"
      />
    </div>
    
    <!-- <router-link to="/CalendarView">
    <button>Calendar</button>
  </router-link> -->


    <div class="weather_wrap" v-if="(typeof weather.main != 'undefined')">
      <div class="location-box">
        <div class="location">{{weather.name}}, {{weather.sys.country}}</div>
        <div class="date">{{dateBuilder()}}</div>
    </div>

    <div class="weather-box">
      <div class="temp">{{ convertKelvinToFahrenheit(weather.main.temp) }}°F</div>
      <div class="weather">{{weather.weather[0].main}}</div>
    </div>
    </div>

  </main>
 
  </div>
</template>


<!-- SCRIPTS -->
<script>
export default {
  name: 'weatherView',
  data () {
    return {
      APPID: 'a8dea41f1ae602fb42c7a3b6de1c8e7f',
      url_base: "https://api.openweathermap.org/data/2.5/",
       //url_base: "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=a8dea41f1ae602fb42c7a3b6de1c8e7f",
      q: '',
      weather: {},
      lat: 0,
      lon: 0,

    };
  },
  methods: {
    convertKelvinToFahrenheit(kelvin) {
    return Math.round((kelvin - 273.15) * 9/5 + 32);
  },
  fetchWeather() {
   
    if (this.q.trim() !== "") {
      // Make an API request based on the user's input (city name)
      fetch(`${this.url_base}weather?q=${this.q}&APPID=${this.APPID}`)
        .then(res => res.json())
        .then(this.setResults)
        .catch(error => {
          console.error('Error fetching weather data:', error);
          
        });
    } else {
      // If the search input is empty,  may want to handle this case 
      console.warn('Search input is empty.');
    }
  },

    setResults(results) {
      
      this.weather = results;
      
    },
    dateBuilder () {
      let d = new Date();
      let months = ["January", "February" ,"March", "April", "May", "June" ,"July" ,
    "August", "September", "October", "November" ,"December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;

    }
  }
  
}
</script>

<!--  *** Stylings *** -->
<style >
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'montserrat', sans-serif;


  background-image: url('../assets/sky-default.jpg');
  background-size: 94%;
  background-position: center;
  transition: 0.4s;
}

.search-box {
  width: 100%;
  margin-bottom: 30px;
}

.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;
  color: #313131;
  font-size: 20px;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}

.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;
}

.location-box .location {
  color: white;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

.location-box .date {
  color: white;
  font-size: 20px;
  font-weight: 300;
  text-align: center;
  font-style: italic;
}

.weather-box {
  text-align: center;
}

.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: white;
  font-size: 102px;
  font-weight: 900;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.weather-box .weather {
  color: white;
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}


</style>
   