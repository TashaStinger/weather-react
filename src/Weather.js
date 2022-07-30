import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";

let count = 0;
let countShowWeather = 0;

export default function Weather() {
  let apiKey = "f7d5a287feccc9d05c7badbf5cac779d";
  let units = "metric";

  const [weatherData, setWeatherData] = useState({ready: false});
  const [city, setCity] = useState("New York");

   function updateCity(event) {
    setCity(event.target.value);
  }

  function showWeather(response) {
    countShowWeather++;
    console.log(response.data);
    console.log(`Show Weather - ${countShowWeather}`);

    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      city: response.data.name,
      date: new Date(response.data.dt * 1000),
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: Math.round(response.data.wind.speed),
      icon: response.data.weather[0].main
    });
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
          <Forecast coordinates={weatherData.coordinates}/>

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
