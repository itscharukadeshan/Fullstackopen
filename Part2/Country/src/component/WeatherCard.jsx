/** @format */

import React, { useEffect, useState } from "react";
import { getCapitalWeather } from "../service/weather";

function WeatherCard({ capitalInfo }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (capitalInfo.latlng) {
      getCapitalWeather(capitalInfo.latlng[0], capitalInfo.latlng[1]).then(
        (data) => setWeatherData(data)
      );
    } else {
      setWeatherData(null);
    }
  }, [capitalInfo]);

  if (!weatherData) {
    return <div className='text-sm text-gray-500'>Loading...</div>;
  }
  return (
    <div>
      {weatherData && (
        <div className=' p-4 px-10 rounded-lg bg-orange-400 flex flex-col w-fit  text-black'>
          <img
            className='h-full w-16'
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={`image of ${weatherData.weather[0].main}`}
          />
          <div className='text-3xl py-2 font-mono'>
            {weatherData.weather[0].description}
          </div>
          <div className='text-xl my-2 font-mono'>
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
