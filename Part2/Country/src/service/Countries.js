/** @format */

import axios from "axios";

const baseUrl = "https://restcountries.com/v3.1";

const getAllCountries = async () => {
  try {
    const response = await axios.get(`${baseUrl}/all`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getCountry = async (name) => {
  try {
    const response = await axios.get(`${baseUrl}/name/${name}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getAllCountries, getCountry };
