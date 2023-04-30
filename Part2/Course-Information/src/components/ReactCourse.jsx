/** @format */
import React from "react";
import courses from "../data/courses";

export default function ReactCourse() {
  let reactCourses = courses[0].parts;
  let sumOfExercises = reactCourses.reduce((total, current) => {
    return total + current.exercises;
  }, 0);

  let courseParts = reactCourses.map((courseData) => (
    <li className='pt-4 list-none' key={courseData.id}>
      {courseData.name} {""} {courseData.exercises}
    </li>
  ));
  return (
    <>
      {courseParts}
      <div>
        {" "}
        <div className='pt-5 font-bold text-xl'>
          Total of {sumOfExercises} exercises
        </div>
      </div>
    </>
  );
}
