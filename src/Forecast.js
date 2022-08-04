import React, { useState } from "react";
import axios from "axios";
import ForecastDay from "./ForecastDay";
import "./Forecast.css";

export default function Forecast(props) {
    const [forecast, setForecast] = useState({ready:false});
    let longitude = props.coordinates.lon;
    let latitude = props.coordinates.lat;
    let units = "metric";
    let apiKey = "f7d5a287feccc9d05c7badbf5cac779d";
    let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=${units}&exclude=hourly,minutely&appid=${apiKey}`;

    function handleResponse(response) {
        console.log(response.data);
        console.log("setForecast");
        setForecast({
            ready:true,
            data: response.data
        });
    }

    if (forecast.ready && forecast.data.lon === props.coordinates.lon && forecast.data.lat === props.coordinates.lat) {
        console.log("render forecast");
        return (
            <div className="Forecast">
                <div className="week">
                    <div className="row">
                        <ForecastDay data={forecast.data.daily[0]} />
                        <ForecastDay data={forecast.data.daily[1]} />
                        <ForecastDay data={forecast.data.daily[2]} />
                        <ForecastDay data={forecast.data.daily[3]} />
                        <ForecastDay data={forecast.data.daily[4]} />
                    </div>
                </div>
            </div>
        )
    }
    else {
        console.log(`Call Forecast API`);
        // alert("Forecast API");
        axios.get(forecastApiUrl).then(handleResponse);
        return "Loading...";
    } 
}