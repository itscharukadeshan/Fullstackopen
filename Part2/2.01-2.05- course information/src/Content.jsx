/** @format */

import React from "react";

const Content = ({ course }) => {
  return (
    <div className='text'>
      {course.map((course) => (
        <p key={course.id}>{}</p>
      ))}
    </div>
  );
};

export default Content;
