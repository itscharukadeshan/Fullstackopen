/** @format */

import React from "react";
import courses from "../data/courses";
import Header from "../components/ Header";

export default function Course() {
  return (
    <>
      <Header />
      <ul>
        {courses.map((courseData) =>
          courseData.parts.map((partData) => (
            <li key={partData.id}>
              {partData.name} {""} {partData.exercises}
            </li>
          ))
        )}
      </ul>
    </>
  );
}
