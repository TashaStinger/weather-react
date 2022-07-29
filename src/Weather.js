import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import FormattedDate from "./FormattedDate";

let count = 0;
let countForecast = 0;
let countShowWeather = 0;

export default function Weather() {
  // let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  // let months = ["Jan", "Fab", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let apiKey = "f7d5a287feccc9d05c7badbf5cac779d";
  let units = "metric";
  // let countForecastDays = 5;

  const [weatherData, setWeatherData] = useState({
    ready: false
    // city: "",
    // date: "",
    // temperature: null,
    // description: "",
    // humidity: null,
    // wind: null,
    // icon: ""
  });
  const [city, setCity] = useState("New York");
  const [forecastData, setForecastData] = useState([]);
  // const [fahrenheit, setFahrenheit] = useState(false);

  // function formatTime(time){
  //   if (time < 10) {
  //     time = "0" + time;
  //   }
  //   return time;
  // }

  function formatForecastDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  }

  function getIcon(weatherDescription) {
    let weatherIcons = {
        Drizzle: "fa-solid fa-cloud-rain",
        Rain: "fa-solid fa-cloud-showers-heavy",
        Snow: "fa-solid fa-snowflake",
        Clear: "fa-solid fa-sun",
        Clouds: "fa-solid fa-cloud-sun",

        Mist: "fa-solid fa-smog",
        Smoke: "fa-solid fa-smog",
        Haze: "fa-solid fa-smog",
        Dust: "fa-solid fa-smog",
        Fog: "fa-solid fa-smog",
        Sand: "fa-solid fa-smog",
        Ash: "fa-solid fa-smog",

        Squall: "fa-solid fa-wind",
        Tornado: "fa-solid fa-tornado"   
    }
    if (weatherDescription in weatherIcons) {
      return weatherIcons[weatherDescription];
    }
    else return "";
  }
  
  function updateCity(event) {
    setCity(event.target.value);
  }

  function displayForecastDay(day){
    return (
          <div className="col p-0">
            <h6>{formatForecastDay(day.dt)}</h6>
            <div className="week-icon"><i className = {getIcon(day.weather[0].main)}></i></div>
            <div className="min-temp">{Math.round(day.temp.min)}°</div>
            <div className="max-temp">{Math.round(day.temp.max)}°</div>
          </div>
    )   
  }

  function displayForecast() {
    // let forecastHTML = `<div className="row">`;
    // forecastData.forEach(function(day, index) {
    //   if (index < countForecastDays) {
    //     displayForecastDay(forecastData[index], index);
    //     // forecastHTML += `
    //     //   <div className="col p-0">
    //     //     <h6>${formatForecastDay(day.dt)}</h6>
    //     //     <div className="week-icon"><i class = ${getIcon(day.weather[0].main)}</i></div>
    //     //     <div id="day-${index}-min-temp">${Math.round(day.temp.min)}°</div>
    //     //     <div id="day-${index}-max-temp">${Math.round(day.temp.max)}°</div>
    //     //   </div>`;
    //     // weekTemperature.celsiusMin[index] = Math.round(day.temp.min);
    //     // weekTemperature.celsiusMax[index] = Math.round(day.temp.max); 
    //     // weekTemperature.fahrenheitMin[index] = Math.round(weekTemperature.celsiusMin[index] * 1.8 + 32);
    //     // weekTemperature.fahrenheitMax[index] = Math.round(weekTemperature.celsiusMax[index] * 1.8 + 32);
    //   }
    // })
    if (forecastData[0] !== undefined) {
      console.log("displayForecast");
      return (
        <div className="week">
          <div className="row">
            {displayForecastDay(forecastData[0])}
            {displayForecastDay(forecastData[1])}
            {displayForecastDay(forecastData[2])}
            {displayForecastDay(forecastData[3])}
            {displayForecastDay(forecastData[4])}
          </div>
        </div>
      )
    }
  }

  function showForecast(response) {
    console.log(response.data.daily);
    let forecast = response.data.daily;
    console.log("showForecast - setForecastData");
    setForecastData(forecast);
  }

  function getForecast (latitude, longitude) {
    let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=${units}&exclude=hourly,minutely&appid=${apiKey}`;
    countForecast++;
    console.log(`Forecast API - ${countForecast}`);
    axios.get(forecastApiUrl).then(showForecast);
  }

  function showWeather(response) {
    countShowWeather++;
    console.log(response.data);
    console.log(`Show Weather - ${countShowWeather}`);

    // let currentDate = new Date(response.data.dt * 1000);
    // let dateString = `${days[currentDate.getDay()]} ${formatTime(currentDate.getHours())}:${formatTime(currentDate.getMinutes())}, 
    //                   ${currentDate.getDate()} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    setWeatherData({
      ready: true,
      city: response.data.name,
      date: new Date(response.data.dt * 1000),
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: Math.round(response.data.wind.speed),
      icon: getIcon(response.data.weather[0].main)
    });

    getForecast(response.data.coord.lat, response.data.coord.lon);
  }

  function getWeather(url) {
    count++;
    console.log(`Call API - ${count}`);
    axios.get(url).then(showWeather);
  }

  function weatherByCity(cityName){
    cityName = cityName.trim();
    if (cityName === "") {
      alert("Type a city");
    } 
    else {
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${apiKey}`;

      alert(`Search weather for ${cityName}`);
      getWeather(apiUrl);
    }
  }

  function searchWeather(event) {
    event.preventDefault();
    weatherByCity(city);
  }

  function createPositionApiUrl(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
    alert(`Search weather for your current city`);
    getWeather(apiUrl);
  }

function weatherByPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(createPositionApiUrl);
}

// function changeToFahrenheit(event) {
//   event.preventDefault();
//   // setFahrenheit(true);
// }

// function showDegrees() {
//   return (
//       <span className="degrees">
//         <a href="/" active="true">°C</a> | <a href="/" onClick={changeToFahrenheit} active="false">°F</a>
//       </span>
//   )
// }

  // if (weatherData.city === undefined && count <2){
  //   weatherByCity(city);
    
  // }

  if (weatherData.ready) {
    console.log("render");
    return (
      <div className="Weather">
        <div className="container">
          <div className="app-content">

            {/* <!-- Change city form --> */}
            <form onSubmit={searchWeather}>
              <div className="row">
                <div className="col-sm mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a city..."
                    autoFocus="on"
                    autoComplete="off"
                    onChange={updateCity}
                  />
                </div>

                <div className="col-sm-6">
                  <div className="row">
                    <div className="col">
                      <button type="submit" className="btn btn-primary search-button">Search</button>
                    </div>
                    <div className="col">
                      <button type="submit" className="btn btn-primary search-button" onClick={weatherByPosition}>Your city</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            {/* <!-- Current date and weather in the current city --> */}
            <div className="current">
              <div className="row">
                <div className="col current-date">
                  {/* {weatherData.date} */}
                  <FormattedDate date={weatherData.date} />
                  </div>
              </div>

              <div className="row d-flex align-items-center">
                <div className="col-sm-1"></div>
                <div className="col-1"></div>

                {/* <!-- Current city with weather --> */}
                <div className="col-6 p-0 current-text">
                  <h1>{weatherData.city}</h1>
                  <span>{weatherData.temperature}</span>
                  <span className="degrees">
                    <a href="/">°C</a> | <a href="/">°F</a>
                  </span>
                  {/* {showDegrees()} */}
                  <ul className="weather">
                    <li className="weather-description">
                      {weatherData.description}
                    </li>
                    <li>humidity - {weatherData.humidity}%</li>
                    <li>wind - {weatherData.wind} m/s</li>
                  </ul>
                </div>

                {/* <!-- Current icon --> */}
                <div className="col p-0 current-icon">
                  <i className ={weatherData.icon}></i>
                </div>
                <div className="col-sm"></div>
              </div>
            </div>

            {displayForecast()}

            <div className="footer">
              <a href="https://github.com/TashaStinger/weather-react" title="GitHub" rel="noreferrer" target="_blank">
                Open-source code
              </a>, by Natalia Chaplia
            </div>
          </div>
        </div>
      </div>
    );
  }
  else {
    weatherByCity(city);
    return "Loading...";
  }
 
}
