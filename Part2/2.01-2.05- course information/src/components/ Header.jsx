/** @format */

import React from "react";
import courses from "../data/courses";

export default function Header() {
  let subHeading = courses[0].name;
  return (
    <>
      <h1 className=' text-5xl pt-5'>Web development curriculum</h1>
      <h2 className=' text-4xl pt-5'>{subHeading}</h2>
    </>
  );
}
