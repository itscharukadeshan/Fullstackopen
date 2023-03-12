/** @format */

import React from "react";
const Content = ({ course }) => {
  return (
    <div className='text'>
      {course.map((course) => (
        <div key={course.id}>
          {course.parts.map((part) => (
            <div key={part.id}>
              {part.name} {part.exercises}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Content;
