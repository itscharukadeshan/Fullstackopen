/** @format */

import React from "react";

const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      Search:
      <input
        className='mt-4 '
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder=' Search for a name...'
      />
    </div>
  );
};

export default Filter;
