import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import CurrentWeather from "./CurrentWeather";
import WeatherIcon from "./WeatherIcon";

let count = 0;
let countForecast = 0;
let countShowWeather = 0;

export default function Weather() {
  let apiKey = "f7d5a287feccc9d05c7badbf5cac779d";
  let units = "metric";
  // let countForecastDays = 5;

  const [weatherData, setWeatherData] = useState({ready: false});
  const [city, setCity] = useState("New York");
  const [forecastData, setForecastData] = useState([]);

   function updateCity(event) {
    setCity(event.target.value);
  }

  function formatForecastDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  }

  function displayForecastDay(day){
    return (
      <div className="col p-0">
        <h6>{formatForecastDay(day.dt)}</h6>
        <div className="week-icon">
          <WeatherIcon description={day.weather[0].main} />
        </div>
        <div className="min-temp">{Math.round(day.temp.min)}°</div>
        <div className="max-temp">{Math.round(day.temp.max)}°</div>
      </div>
    )   
  }

  function displayForecast() {
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
    console.log("setForecastData");
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

    setWeatherData({
      ready: true,
      city: response.data.name,
      date: new Date(response.data.dt * 1000),
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: Math.round(response.data.wind.speed),
      icon: response.data.weather[0].main
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
      // alert(`Search weather for ${cityName}`);
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
    // alert(`Search weather for your current city`);
    getWeather(apiUrl);
  }

function weatherByPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(createPositionApiUrl);
}

  // if (weatherData.city === undefined && count <2){
  //   weatherByCity(city);
  // }

  if (weatherData.ready) {
    console.log("render");
    return (
      <div className="Weather">
        <div className="app-content">

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

          <CurrentWeather data={weatherData} />

          {displayForecast()}

          <div className="footer">
            <a href="https://github.com/TashaStinger/weather-react" title="GitHub" rel="noreferrer" target="_blank">
              Open-source code
            </a>, by Natalia Chaplia
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
