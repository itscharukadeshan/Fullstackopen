/** @format */
import React from "react";
import { useEffect, useState } from "react";
import Search from "./components/Search";
export default function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");

  const handleValue = (e) => {
    setValue(e.target.value);
  };

  console.log(value);
  return (
    <div className='mt-5 mx-5'>
      <Search handleValue={handleValue} />
    </div>
  );
}
