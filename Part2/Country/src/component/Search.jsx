/** @format */

import React, { useState } from "react";
import { countriesNames } from "../service/countries";
import WeatherCard from "../component/WeatherCard";

function Search() {
  const [value, setValue] = useState("");
  const fullSearchResult = countriesNames(value);
  const searchResult = fullSearchResult.slice(0, 10);

  const handleSearch = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className='drop-shadow-xl'>
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
        {
          <div className='py-4'>
            <div>
              {value.length >= 1 && value.length <= 2 && (
                <div className='text-red-600 text-xl'>
                  Too many matches to display 🤯
                </div>
              )}
              {fullSearchResult.length === 0 && value.length > 2 && (
                <div className='text-red-600 text-xl'>No matches found 🙅‍♀️</div>
              )}
            </div>

            <ul>
              {searchResult.map((country) => (
                <li
                  className='flex flex-col gap-2 py-8 text-4xl font-serif font-bold mt-2 text-black'
                  key={country.name.common}>
                  {country.name.common}
                  <div className='text-lg my-4'>
                    <div> Capital : {country.capital}</div>
                    <div> Population : {country.population}</div>
                    <div> Area : {country.area}</div>
                  </div>
                  <div className='text-lg'>
                    <p className=' text-xl mb-2 mt-4'>Languages</p>
                    {
                      <ul>
                        {Object.entries(country.languages).map(
                          ([code, name]) => (
                            <li className='ml-8 list-disc' key={code}>
                              {name}
                            </li>
                          )
                        )}
                      </ul>
                    }
                  </div>
                  <div className='my-4'>
                    <img src={country.flags.png} alt={country.flags.alt} />
                  </div>
                  <div className='text-sm font-mono pt-5 pb-4'>
                    Weather of {country.capital}
                  </div>
                  <WeatherCard capitalInfo={country.capitalInfo} />
                </li>
              ))}
            </ul>
          </div>
        }
      </div>
    </div>
  );
}

export default Search;
