/** @format */

import React from "react";
import courses from "../data/courses";
import Header from "./ Header";

export default function Course() {
  let reactCourses = courses[0].parts;
  let courseParts = reactCourses.map((courseData) => (
    <li className='pt-1' key={courseData.id}>
      {courseData.name} {""} {courseData.exercises}
    </li>
  ));
  return (
    <>
      <Header />
      <ul className='pt-4'>{courseParts}</ul>
    </>
  );
}
