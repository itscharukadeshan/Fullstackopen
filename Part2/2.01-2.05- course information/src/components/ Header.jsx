/** @format */

import React from "react";
import courses from "../data/courses";

export default function Header() {
  let headLine = courses.map((headLine) => headLine.name);
  return (
    <>
      <h1>Web development curriculum</h1>
      <h2>{headLine[0]}</h2>
    </>
  );
}
