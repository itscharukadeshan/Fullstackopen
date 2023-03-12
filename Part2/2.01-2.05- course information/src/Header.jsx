/** @format */

import React from "react";

const Header = ({ course }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      <h1>{course.name}</h1>
    </>
  );
};

export default Header;
