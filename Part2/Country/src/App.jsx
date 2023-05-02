/** @format */
import React from "react";
import Search from "./components/Search";
import { getCountries } from "./service/Countries";
export default function App() {
  return (
    <div className='mt-5 mx-5'>
      <Search handleValue={handleValue} />
    </div>
  );
}
