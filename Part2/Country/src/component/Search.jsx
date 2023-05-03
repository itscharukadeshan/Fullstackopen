/** @format */

import React from "react";
import countries from "../service/countries";
function Search() {
  return (
    <div>
      <div className='text-xl font-serif font-bold w-full bg-cyan-600 p-5 text-white'>
        Find countries{""}
        <input
          className=' ml-4 bg-slate-400 rounded-lg border-solid border-2 border-cyan-800'
          type='text'
          placeholder='Search for a country'
          onChange={(e) => console.log(e.target.value)}
        />
        <div></div>
      </div>
    </div>
  );
}

export default Search;
