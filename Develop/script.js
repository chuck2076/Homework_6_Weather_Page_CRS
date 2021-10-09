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
//var futureInfo = "http://openweathermap.org/img/wn/" + icon1 + ".png";
//var img = document.createElement('img');
//            img.src = futureInfo;
//            document.getElementById('icon1').appendChild(img);

//Creating Current Weather Variable
//let currentWeather = document.querySelector ("currentWeather")
//If statement to fetch currentWeather into CurrentWeather
//if currentWeather {

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
      //Turn this into a for loop?
      console.log(data);
      lat = data.coord.lat;
      lon = data.coord.lon;
      console.log(lat)
      console.log(lon)
      //need function to change date to real date
      //date = data.dt;
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
      getUV(lat, lon);
      //displayCurrentWeather(data);
      document.getElementById("cityName1").textContent = data.name;
      document.getElementById("date").textContent = moment().format("MM/DD/YYYY");
      //document.getElementById("icon").textContent = data.weather[0].icon;
      document.getElementById("temp").textContent = "Temp: " + data.main.temp + "F";
      document.getElementById("humidity").textContent = "Humidity: " + data.main.humidity + "%";
      document.getElementById("wind").textContent = "Wind Speed: " + data.wind.speed + " MPH";
      //document.getElementById("UVI").textContent = "UV Index: " + data.UVI;
      console.log(date);
    })
    .catch(function () {});
}
// window.onload = function () {
//   getCurrentWeather(" ");
// };


//Parsing and Displaying Data from Current Weather
// function displayCurrentWeather(display) {
//   document.getElementById("cityName").textContent = display.city_name;
//   document.getElementById("date").textContent = display.date;
//   document.getElementById("icon").textContent = display.icon;
//   document.getElementById("temp").textContent = display.temp;
//   document.getElementById("humidity").textContent = display.humidity;
//   document.getElementById("wind").textContent = display.wind;
//   document.getElementById("UVI").textContent = display.UVI;
//   console.log(date);
//   //   document.getElementById('UV').innerHTML =
// }

// Need to figure out how to get weather icon

// function getCoordinates() {
//     fetch(fiveDayAPI). then(function(response) {
//     if (response.ok) {
//      response.json().then(function (data) {
//             console.log(data.city.coord);
//             var latitude = data.city.coord.lat;
//             var longitude = data.city.coord.lon;
//             getWeatherOneDay(latitude, longitude);
//             console.log(data);
//               })
//       }
//     }

//Grab 5 Day response to get latitide and longitude
//Help from Damian and Jack from class
// fetch(fiveDayAPI).then(function(response) {
//     if(response.ok){
//         response.json().then(function(data){
//             //dt_txt = data.dt_text;
//             lat = data.city.coord.lat;
//             lon = data.city.coord.lon;
//             console.log(lat);
//             console.log(lon);
//             console.log(dt_txt)
//         });
//     } else {
//          alert(`Error: ${response.statusText}`)
//      }
//  })

//Parsing oneCall to get lat, lon and 5 dayinfo
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
              //console.log(data);
         UVI = data.hourly[0].uvi;
          // records the current date to use for the current weather box            
        var fiveDay = data.daily.slice(0,5);
        var date = new Date()
        for (let i = 0; i < fiveDay.length; i++) {
            var element = fiveDay[i];
            console.log(element)
            // var fiveDayTemp = element.temp.day;
            // //var fiveDayDate = element.dt;
            // var fiveDayIcon = element.weather[0].icon
            // var fiveDayWind = element.wind_speed;
            // var fiveDayHumidity = element.humidity;
            console.log(fiveDay);
            let dateEl = document.createElement("li");
            //var date = moment().format("MM/DD/YYYY");
            // formats the date into a X/XX/XXXX format rather than what the API gives
            dateEl.textContent = moment(today).add(i, 'days').format("MM/DD/YYYY"); // contribution Sue Lee
            dateEl.setAttribute ("class", "bolder");
            // dynamically generate html elements to put in the cards
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
  //}
  // window.onload = function () {
  //   getUV();
  // };

  function searchHandler(event) {
    event.preventDefault();
    console.log("fired");
    let cityName = $("#searchInput").val();
    console.log(cityName);
  
    getCurrentWeather(cityName);

}
var submit = document.querySelector(".submitBtn")

submit.addEventListener("click", searchHandler)










//Setting 5 Day to display
    //   function displayFiveDay (display) {
    //     document.getElementById('cityName2').innerHTML = display.city_name;
    //   //  document.getElementById('fiveDayDate').innerHTML = display.fiveDayDate;
    //     document.getElementById('icon').innerHTML = display.fiveDayIcon;
    //     document.getElementById('fiveDayTemp').innerHTML = display.fiveDayTemp;
    //     document.getElementById('fiveDayHumidity').innerHTML = display.fiveDayHumidity;
    //     document.getElementById('fiveDayWind').innerHTML = display.fiveDayWind;
    //  //   document.getElementById('UVI').innerHTML = UVI;
    //  //   document.getElementById('UV').innerHTML =

    // }

//Use local storage to get past city searches
//Event Make button for past cities
//On click pull that city's info from local storage

// function getWeatherOneDay() {
//     fetch(oneCall)
//         .then(function (response) {
//             response.json();
//         })
//         .then(function (data) {
//                 console.log(data);

//                   })

//           }
//           console.log(data);

//Parse data to get City Name, date, icon of weather conditions, temp, humidity, wind speed and UV i

//Fetch 5 day API to get Date, Icon, Temp, Wind Humidity
// fetch(fiveDayAPI).then(function(response) {
//     if(response.ok){
//         response.json().then(function(data){
//             dt_txt = data.dt_text;
//             lat = data.city.coord.lat;
//             lon = data.city.coord.lon;
//             console.log(lat);
//             console.log(lon);
//             console.log(dt_txt)
//         });
//     } else {
//          alert(`Error: ${response.statusText}`)
//      }
//  })

//then
// for (let i = 0; i < array.length(5); i++) {
//     const element = array[i];
//     date, icon, temp, wind, humidity

// }

//Write to i using HTML in jQuery look at Unit 3
// var = document.createElement('div')

//Use local storage to get past city searches
//Event Make button for past cities
//On click pull that city's info from local storage
