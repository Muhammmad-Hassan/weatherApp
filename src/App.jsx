// src/App.js
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const apiKey = "954a17b693aad2b8cb8ca0301dcd22de"


  const fetchWeather = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("City not found");
      setWeather(null);
    }
  };

  const handleSearch = () => {
    if (city.trim() !== "") {
      fetchWeather(city);
    }
  };



  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="search">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Temperature: {Math.floor(weather.main.temp-273.15)} °C</p>
        </div>
      )}
    </div>
  );
};

export default App;
