var oneCall = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=1062cae7f5c71c87bd2302f6ec03c96d'
var currentWeather = 'https://api.openweathermap.org/data/2.5/weather?q={cityname}&units=imperial&appid=1062cae7f5c71c87bd2302f6ec03c96d'


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
function getWeather(cityID) {
    var key = '1062cae7f5c71c87bd2302f6ec03c96d';
fetch (
    'https://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&units=imperial&appid=' + key)
    .then(function (response) {
        return response.json();
      })
          .then(function (data) {
            displayWeather(data);
              })
              .catch(function() {
                // catch any errors
              });
            }  
            window.onload = function() {
                getWeather( 6167865 );
              }

function displayWeather (display) {
    document.getElementById('cityName').innerHTML = display.name;
    document.getElementById('date').innerHTML = display.dt;
    document.getElementById('icon').innerHTML = display.weather;
    document.getElementById('temp').innerHTML = display.main [0];
    document.getElementById('humidity').innerHTML = display.main [5];
    document.getElementById('wind').innerHTML = display.wind[0];
 //   document.getElementById('UV').innerHTML =

}
          
      
//Parse data to get City Name, date, icon of weather conditions, temp, humidity, wind speed and UV index