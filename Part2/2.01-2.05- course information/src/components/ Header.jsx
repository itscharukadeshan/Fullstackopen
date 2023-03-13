/** @format */

const Header = (props) => {
  const courseCopy = props.course.map((course) => course);
  console.log({ courseCopy });
  return (
    <>
      <div>{courseCopy[0].name}</div>
    </>
  );
};

export default Header;
