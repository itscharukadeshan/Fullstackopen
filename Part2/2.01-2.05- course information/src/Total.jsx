/** @format */

import React from "react";

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return <div className='text'>Number of exercises {total}</div>;
};

export default Total;
