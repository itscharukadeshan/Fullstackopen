/** @format */

const Header = (props) => {
  const courseCopy = props.course.map((course) => course);
  return (
    <>
      <h2>{courseCopy[0].name}</h2>
    </>
  );
};

export default Header;
