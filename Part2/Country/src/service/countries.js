/** @format */

import axios from "axios";
import { useEffect, useState } from "react";

const Base_Url = "https://restcountries.com/v3.1/";

const useCountries = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get(`${Base_Url}all`).then((response) => setCountries(response.data));
  }, []);

  return countries;
};

const countriesNames = (value) => {
  const [name, setName] = useState([]);

  useEffect(() => {
    axios
      .get(`${Base_Url}name/${value}`)
      .then((response) => setName(response.data));
  }, [value]);

  return name;
};
export { useCountries, countriesNames };
