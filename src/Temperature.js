import React, { useState } from "react";
import "./Temperature.css";

export default function Temperature(props) {
  let [units, setUnits] = useState("celsius");

  function showFahrenheit(event) {
    event.preventDefault();
    setUnits("fahrenheit");
  }

  function showCelsius(event) {
    event.preventDefault();
    setUnits("celsius");
  }

  function fahrenheit(){
    let fahrenheitTemperature = Math.round((props.temperature * 9/5) + 32);
    return fahrenheitTemperature;
  }

  if (units === "celsius") {
    return ( 
      <div className="Temperature">
        <span>{props.temperature}</span>
          <span className="degrees">
            <strong>°C</strong> | <a href="/" onClick={showFahrenheit}>°F</a>
        </span>
      </div>
    )
  }
  else {
    return ( 
      <div className="Temperature">
        <span>{fahrenheit()}</span>
          <span className="degrees">
            <a href="/" onClick={showCelsius}>°C</a> | <strong>°F</strong>
        </span>
      </div>
    )
  }
}