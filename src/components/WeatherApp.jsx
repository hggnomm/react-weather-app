import React, { useEffect, useState } from "react";
import "./WeatherApp.css";
import sunny from "../assets/sunny.png";
import cloudy from "../assets/cloudy.png";
import rainy from "../assets/rainy.png";
import snowy from "../assets/snowy.png";

const WeatherApp = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const api_key = import.meta.env.VITE_API_KEY_OPEN_WEATHER_MAP;

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      const defaultLocation = "Vietnam";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=${api_key}`;
      const res = await fetch(url);
      const defaultData = await res.json();
      setData(defaultData);
    };

    fetchDefaultWeather();
  }, []);
  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };
  const search = async () => {
    if (location.trim() !== "") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`;

      const res = await fetch(url);
      const searchData = await res.json();

      setData(searchData);
      setLocation("");
    }
  };
  return (
    <div className="container">
      <div className="weather-app">
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">{data.name}</div>
          </div>
          <div className="search-bar">
            <input
              value={location}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="Enter Location"
            />
            <i onClick={search} className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <div className="weather">
          <img src={sunny} alt="sunny" />
          <div className="weather-type">
            {data.weather ? data.weather[0]?.main : null}
          </div>
          <div className="temp">
            {data.main && data.main.temp
              ? `${Math.floor(data.main.temp)}°`
              : null}
          </div>
        </div>
        <div className="weather-date">
          <p>Fri, 3 May</p>
        </div>
        <div className="weather-data">
          <div className="humidity">
            <div className="data-name">Humidity</div>
            <i className="fa-solid fa-droplet"></i>
            <div className="data">{data.main?.humidity}%</div>
          </div>
          <div className="wind">
            <div className="data-name">Wind</div>
            <i className="fa-solid fa-wind"></i>
            <div className="data">{data.wind?.speed} km/h</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
