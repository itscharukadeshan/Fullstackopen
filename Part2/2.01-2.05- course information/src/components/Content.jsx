/** @format */
import courses from "./Course";

const Content = () => {
  const courseParts = courses.map((course) => course.parts);
  const courseFlatten = courseParts.flat(Infinity);
  console.log(courseFlatten);

  return <></>;
};

export default Content;
