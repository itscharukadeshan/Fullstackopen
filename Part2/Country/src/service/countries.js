/** @format */

import axios from "axios";

const Base_Url = "https://restcountries.eu/rest/v3/all";

const getCountries = () => {
  const response = axios.get(Base_Url);
  return response.data;
};

export default { getCountries };
