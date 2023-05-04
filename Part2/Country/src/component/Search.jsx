/** @format */

import React, { useEffect, useState } from "react";
import { useCountries, countriesNames } from "../service/countries";

function Search() {
  const countries = useCountries();
  const [value, setValue] = useState("   ");
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
      <div className='ms-5'>
        {value.length < 3 ? (
          <p className='text-red-300'>Too many matches</p>
        ) : (
          <ul>
            {searchResult.map((country) => (
              <li
                className='flex flex-row gap-2 text-lg font-serif font-bold mt-2 text-black'
                key={country.name.common}>
                {country.name.common}{" "}
                <button className='p-1  px-2 text-sm text-cyan-700 transition-colors duration-150 border border-cyan-500 rounded-lg focus:shadow-outline hover:bg-cyan-500 hover:text-cyan-100'>
                  See more
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Search;
