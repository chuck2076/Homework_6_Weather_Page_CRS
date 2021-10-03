var lat;
var lon;
var part = 'hourly';
var city_name = 'Chicago';
var date;
var UVI;
var daily = 'daily';
var dt_txt;
var icon;
var temp;
var humidity;
var wind;


var API_key = '1062cae7f5c71c87bd2302f6ec03c96d';
var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${API_key}`
var currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=imperial&appid=${API_key}`
var fiveDayAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&units=imperial&appid=${API_key}`


//Units needed from Current Weather: city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index w/ color
//Units needed from Open Weather: 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

//Search by City - convert open weather calls to lat, lon
//city search history saved to local storage and viewed in button
// var futureInfo = "http://openweathermap.org/img/wn/" + dailyW.icon + ".png";
// var img = document.createElement('img');
//             img.src = futureInfo;
//             document.getElementById('icon1').appendChild(img);

//Creating Current Weather Variable
//let currentWeather = document.querySelector ("currentWeather")
//If statement to fetch currentWeather into CurrentWeather
//if currentWeather {
//Fetching API to get data
function getCurrentWeather(city_name) {
fetch (currentWeather)
    .then(function (response) {
        return response.json();
      })
          .then(function (data) {
            lat = data.coord.lat;
            lon = data.coord.lon;
            date = data.dt;
            icon = data.weather
            temp = data.main.temp
            humidity = data.main.humidity
            wind = data.wind.speed
            console.log(wind);
            displayCurrentWeather(data);
              })
              .catch(function() {

              });
            }  
            window.onload = function() {
                getCurrentWeather('Chicago');
              }
//Parsing and Displaying Data from Current Weather
function displayCurrentWeather (display) {
    document.getElementById('cityName').innerHTML = city_name;
    document.getElementById('date').innerHTML = date;
    document.getElementById('icon').innerHTML = icon;
    document.getElementById('temp').innerHTML = temp;
    document.getElementById('humidity').innerHTML = humidity;
    document.getElementById('wind').innerHTML = wind;
 //   document.getElementById('UV').innerHTML =

}

          
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
    

//Parse data to get City Name, date, icon of weather conditions, temp, humidity, wind speed and UV index