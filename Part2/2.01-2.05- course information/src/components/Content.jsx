/** @format */
import courses from "./Course";

const Content = () => {
  const courseParts = courses.map((course) => course.parts);
  const courseFlatten = courseParts.flat(Infinity);

  const exercises = courseFlatten
    .slice(0, 4)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue.exercises;
    }, 0);
  const newExercises = courseFlatten
    .slice(4, 6)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue.exercises;
    }, 0);

  return (
    <>
      {" "}
      {courseFlatten.slice(0, 4).map((part) => (
        <div key={part.id}>
          {part.name} {part.exercises}
        </div>
      ))}
      <h3>total of {exercises} exercises</h3>
      <h2>{courses[1].name}</h2>
      {courseFlatten.slice(4, 6).map((part) => (
        <div key={part.id}>
          {part.name} {part.exercises}
        </div>
      ))}
      <h3>total of {newExercises} exercises</h3>
    </>
  );
};

export default Content;
