/** @format */

import React, { useEffect, useState } from "react";
import { useCountries, countriesNames } from "../service/countries";

function Search() {
  const countries = useCountries();
  const [value, setValue] = useState("");
  const searchResult = countriesNames(value).slice(0, 10);

  const handleSearch = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <div className='text-xl font-serif font-bold w-full bg-cyan-600 p-5 text-white'>
        Find countries{""}
        <input
          className=' ml-4 bg-slate-400 rounded-lg border-solid border-2 border-cyan-800'
          type='text'
          placeholder='Search for a country'
          onChange={handleSearch}
        />
      </div>
      <div>
        <ul>
          {searchResult.map((country) => (
            <li key={country.name.common}>{country.name.common}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Search;
