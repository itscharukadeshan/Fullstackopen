/** @format */

import axios from "axios";
import { useEffect, useState } from "react";

const Base_Url = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

const whetherCapital = ({ capitalInfo }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${Base_Url}lat=${capitalInfo.latlng[0]}&lon=${capitalInfo.latlng[1]}&appid=${apiKey}`
      )
      .then((response) => setWeatherData(response.data));
  }, [capitalInfo]);
};

export default whetherCapital;
