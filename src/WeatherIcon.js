import React from "react";

export default function WeatherIcon(props) {
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
    if (props.description in weatherIcons) {
      return (
        <div className="WeatherIcon">
            <i className={weatherIcons[props.description]}></i>
        </div>
      )
    }
    else return "";
}