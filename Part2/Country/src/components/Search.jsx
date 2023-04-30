/** @format */

import React from "react";

export default function Search({ handleSearch }) {
  return (
    <div>
      <div className='text-xl font-serif w-full bg-cyan-600 p-5 text-black'>
        Find countries :{" "}
        <input
          className=' bg-slate-400 rounded-lg border-solid border-2 border-cyan-800'
          type='text'
          value=' Search for a country'
          onClick={handleSearch}
        />
      </div>
    </div>
  );
}
