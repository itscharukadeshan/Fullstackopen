/** @format */

import axios from "axios";

const Base_Url = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

const whetherCapital = (city) => {
  useEffect(() => {
    axios
      .get(`${Base_Url}${city}&appid=${apiKey}`)
      .then((response) => response.data);
  }, [city]);
};

export default whetherCapital;
