import React from "react";
import WeatherIcon from "./WeatherIcon";

export default function ForecastDay(props) {
     function formatForecastDay(timestamp) {
        let date = new Date(timestamp * 1000);
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days[date.getDay()];
    }

    return (
        <div className="ForecastDay col p-0">
            <h6>{formatForecastDay(props.data.dt)}</h6>
            <div className="week-icon">
            <WeatherIcon description={props.data.weather[0].main} />
            </div>
            <div className="min-temp">{Math.round(props.data.temp.min)}°</div>
            <div className="max-temp">{Math.round(props.data.temp.max)}°</div>
        </div>
    )
}