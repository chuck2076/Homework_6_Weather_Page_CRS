var lat;
var lon;
var part = "hourly";
var cityName = "Chicago";
var today = moment();
var UVI;
var daily = "daily";
var dt_txt;
var icon1;
var temp;
var humidity;
var wind;

//function getAPI(cityName){
var API_key = "1062cae7f5c71c87bd2302f6ec03c96d";
//var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${API_key}`
//var currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${API_key}`;
var fiveDayAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${API_key}`;
//var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${API_key}`

//Units needed from Current Weather: city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV i w/ color
//Units needed from Open Weather: 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

//Search by City - convert open weather calls to lat, lon
//city search history saved to local storage and viewed in button


//Fetching help from Unit 6 & https://bithacker.dev/fetch-weather-openweathermap-api-javascript
//Fetching API to get data
function getCurrentWeather(cityName){
  var currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${API_key}`;
  document.getElementById("cityName1").textContent = " ";
      document.getElementById("date").textContent = " ";
      //document.getElementById("icon").textContent = data.weather[0].icon;
      document.getElementById("temp").textContent = " ";
      document.getElementById("humidity").textContent = " ";
      document.getElementById("wind").textContent = " ";
  fetch(currentWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
  //Creating variables to hold data
      console.log(data);
      lat = data.coord.lat;
      lon = data.coord.lon;
      console.log(lat)
      console.log(lon)
      icon1 = data.weather[0].icon;
      console.log(icon1);
      var futureInfo = "http://openweathermap.org/img/wn/" + icon1 + ".png";
var img = document.createElement('img');
            img.src = futureInfo;
            document.getElementById('icon1').appendChild(img);
      temp = data.main.temp;
      console.log(temp);
      humidity = data.main.humidity;
      wind = data.wind.speed;
      getUV(lat, lon);//For Open Weather calls to API
      //Adding data from function to HTML
      document.getElementById("cityName1").textContent = data.name;
      document.getElementById("date").textContent = moment().format("MM/DD/YYYY");
      document.getElementById("temp").textContent = "Temp: " + data.main.temp + "F";
      document.getElementById("humidity").textContent = "Humidity: " + data.main.humidity + "%";
      document.getElementById("wind").textContent = "Wind Speed: " + data.wind.speed + " MPH";
      
    })
    .catch(function () {});
}

//Parsing oneCall by lat, lon for 5 dayinfo
    function getUV (lat,lon) {
      document.getElementById("0").textContent = " ";
      document.getElementById("1").textContent = " ";
      document.getElementById("2").textContent = " ";
      document.getElementById("3").textContent = " ";
      document.getElementById("4").textContent = " ";
      
    var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${API_key}`
     fetch(oneCall).then(function(response) {
        if(response.ok){
            response.json().then(function(data){

// Trying write UVI to HTML breaks the code. Says it's empty even though it pulls the data.          
         UVI = data.hourly[0].uvi;
         console.log(UVI)
         //document.getElementById("UVI").textContent = "UV Index: " + data.hourly[0].uvi;

  // Records the current date to use for the current weather box            
        var fiveDay = data.daily.slice(0,5);
        for (let i = 0; i < fiveDay.length; i++) {
            var element = fiveDay[i];
            console.log(element)
            console.log(fiveDay);
            let dateEl = document.createElement("li");
            // Gets the 5 Day date through Moment
            dateEl.textContent = moment(today).add(i, 'days').format("MM/DD/YYYY");
            dateEl.setAttribute ("class", "bolder");
      // Dynamically generate html elements to put in the li cards -help from Ethan, Jack and Damian in class
            let tempEl = document.createElement("li");
            tempEl.textContent = "Temp: " + element.temp.day + "F"; 
            let windEl = document.createElement("li");
            windEl.textContent ="Wind: " + element.wind_speed + " MPH";
            let humidityEl = document.createElement("li");
            humidityEl.textContent = "Humidity: " + element.humidity + "%";
            let iconEl = document.createElement("img");
            iconEl.setAttribute ("class", "futureIcon");
            // gets the weather icon code to search up the image
            let iconCode = element.weather[0].icon;
            console.log(iconCode)
            let iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
            iconEl.setAttribute("src", iconUrl);
          //Adding the data to the li cards
            document.getElementById(i).appendChild(dateEl);
            document.getElementById(i).appendChild(iconEl);
            document.getElementById(i).appendChild(tempEl);
            document.getElementById(i).appendChild(windEl);
            document.getElementById(i).appendChild(humidityEl);
        
        }
 //     document.getElementById('UVI').innerHTML ="UV Index: " + data.hourly[0].uvi;
 //               displayFiveDay(data);


            });
        } else {
             alert(`Error: ${response.statusText}`)
         }
     })
    };

//Search button handler for search text input
  function searchHandler(event) {
    event.preventDefault();
    let cityName = $("#searchInput").val();
    console.log(cityName);
  
    getCurrentWeather(cityName);

}
var submit = document.querySelector(".submitBtn")

submit.addEventListener("click", searchHandler)

//Things Not Finished:
//Use local storage to get past city searches
//Event Make button for past cities
//On click pull that city's info from local storage




