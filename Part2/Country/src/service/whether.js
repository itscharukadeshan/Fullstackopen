/** @format */

import axios from "axios";
import { useEffect, useState } from "react";

const Base_Url = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = process.env.OPENWEATHER_API_KEY;

const whetherCountry = () => {
  const [whether, setWhether] = useState([]);

  useEffect(() => {
    axios
      .get(`${Base_Url}${city}&appid=${apiKey}`)
      .then((response) => setWhether(response.data));
  }, []);

  return whether;
};

export default whetherCountry;
