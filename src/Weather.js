import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather() {
  let [weatherData, setWeatherData] = useState({
    city: "Kyiv",
    date: "Wednesday 10:49, 29 Jun 2022",
    temperature: 25,
    description: "clear sky",
    humidity: 80,
    wind: 3,
    icon: "fa-solid fa-sun"
  });
  let [city, setCity] = useState("");

  function updateCity(event) {
    setCity(event.target.value);
  }

  function searchWeather(event) {
    event.preventDefault();
    city = city.trim();
    if (city === "") {
      alert("Type a city");
    } else {
      let apiKey = "f7d5a287feccc9d05c7badbf5cac779d";
      let units = "metric";
      let ApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

      axios.get(ApiUrl).then(showWeather);
    }
  }

  function showWeather(response) {
    // console.log(response.data);
    setWeatherData({
      city: response.data.name,
      date: "Wednesday 10:49, 29 Jun 2022",
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: Math.round(response.data.wind.speed),
      icon: "fa-solid fa-sun"
    });
      // console.log(weatherData);
  }

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
                    <button
                      type="submit"
                      className="btn btn-primary search-button"
                    >
                      Search
                    </button>
                  </div>
                  <div className="col">
                    <button
                      type="submit"
                      className="btn btn-primary search-button"
                    >
                      Your city
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* <!-- Current date and weather in the current city --> */}
          <div className="current">
            <div className="row">
              <div className="col current-date">{weatherData.date}</div>
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
                <i className={weatherData.icon}></i>
              </div>
              <div className="col-sm"></div>
            </div>
          </div>
          <div className="footer">
            <a href="https://github.com/TashaStinger/weather-react" title="GitHub" target="_blank">Open-source code</a>, by Natalia Chaplia
          </div>
        </div>
      </div>
    </div>
  );
}
