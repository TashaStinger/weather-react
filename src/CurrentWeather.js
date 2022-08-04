import React from "react";
import FormattedDate from "./FormattedDate";
import Temperature from "./Temperature";
import WeatherIcon from "./WeatherIcon";
import "./CurrentWeather.css";

export default function CurrentWeather(props) {
    return (
        <div className="CurrentWeather">
            <div className="current">
            <div className="row">
              <div className="col current-date">
                <FormattedDate date={props.data.date} />
              </div>
            </div>

            <div className="row d-flex align-items-center">
              <div className="col-sm-1"></div>
              <div className="col-1"></div>
              <div className="col-6 p-0 current-text">
                <h1>{props.data.city}</h1>
                <Temperature temperature={props.data.temperature} />
                <ul className="weather">
                  <li className="weather-description">{props.data.description}</li>
                  <li>humidity - {props.data.humidity}%</li>
                  <li>wind - {props.data.wind} m/s</li>
                </ul>
              </div>
              <div className="col p-0 current-icon">
                <WeatherIcon description={props.data.icon} />
              </div>
              <div className="col-sm"></div>
            </div>
          </div>
        </div>
    )
}
