/** @format */

import React from "react";

const Content = ({ parts }) => {
  return (
    <div className='text'>
      {parts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  );
};

export default Content;
