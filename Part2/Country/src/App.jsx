/** @format */
import React from "react";
import Search from "./components/Search";
import { getAllCountries } from "./service/Countries";
export default function App() {
  return (
    <div className='mt-5 mx-5'>
      <Search />
    </div>
  );
}
