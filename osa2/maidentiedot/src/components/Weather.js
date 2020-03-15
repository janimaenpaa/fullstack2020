import React, { useState, useEffect } from "react";

import axios from "axios";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState([]);
  useEffect(() => {
    console.log("effect");
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${city}`
      )
      .then(response => {
        console.log("promise fulfilled");
        setWeather(response.data.current);
        console.log(response.data.current);
      });
  }, [city]);

  return (
    <div>
      <h3>Weather in {city}</h3>
      <b>temperature: </b> {weather.temperature}
      <div>
        <img src={weather.weather_icons} alt="WeatherImg" />
      </div>
      <div>
        <b>wind: </b> {weather.wind_speed} mph direction {weather.wind_dir}
      </div>
    </div>
  );
};

export default Weather;
