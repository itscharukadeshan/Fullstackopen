/** @format */
import React from "react";
import { useEffect, useState } from "react";
import Search from "./components/Search";
export default function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
  };
  return (
    <div className='mt-5 mx-5'>
      <Search handleSearch={handleSearch} />
    </div>
  );
}
