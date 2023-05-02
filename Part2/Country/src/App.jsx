/** @format */
import React from "react";
import Search from "./components/Search";
import { getAllCountries, getCountry } from "./service/Countries";
export default function App() {
  getCountry();
  return (
    <div className='mt-5 mx-5'>
      <Search />
    </div>
  );
}
