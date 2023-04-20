/** @format */

import React from "react";
import courses from "../data/courses";

export default function NodeCourse() {
  let nodeHeadline = courses[1].name;
  let nodeCourses = courses[1].parts;
  let sumOfExercises = nodeCourses.reduce((total, current) => {
    return total + current.exercises;
  }, 0);

  let courseParts = nodeCourses.map((courseData) => (
    <li className=' pt-4 list-none' key={courseData.id}>
      {courseData.name} {courseData.exercises}
    </li>
  ));

  return (
    <>
      <h3 className='pt-5 text-3xl'>{nodeHeadline}</h3>
      <>{courseParts}</>
      <div className='pt-4'>Total of {sumOfExercises} exercises</div>
    </>
  );
}
