/** @format */

import axios from "axios";
import { useEffect, useState } from "react";

const Base_Url = "https://restcountries.com/v3.1/all";

const useCountries = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get(Base_Url).then((response) => setCountries(response.data));
  }, []);

  return countries;
};

export default useCountries;
