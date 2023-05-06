/** @format */

import React, { useEffect, useState } from "react";
import { getCapitalWeather } from "../service/weather";

function WeatherCard({ capitalInfo }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    getCapitalWeather(capitalInfo.latlng[0], capitalInfo.latlng[1]).then(
      (data) => setWeatherData(data)
    );
  }, [capitalInfo]);

  return (
    <div>
      {weatherData && (
        <div className=' p-4 px-10 rounded-md bg-orange-400 flex flex-col w-fit  text-black'>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={`image of ${weatherData.weather[0].main}`}
          />
          <div className='3xl pt-2 '>{weatherData.name}</div>
          <div className='text-xl py-2'>
            {weatherData.weather[0].description}
          </div>
          <div className='text-2xl font-serif mt-2'>
            <div>
              Feels like : {Math.round(weatherData.main.feels_like)}&#8451;
            </div>
            <div>
              Temperature : {Math.round(weatherData.main.temp_max)} &#8451;
            </div>
            <div>Humidity : {Math.round(weatherData.main.humidity)}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherCard;
