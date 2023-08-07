/** @format */
import { Link } from "react-router-dom";
import { GiBookshelf } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { BiBookAdd } from "react-icons/bi";

function Home() {
  return (
    <div className='flex flex-col items-center gap-4 my-44'>
      <Link to={"books"}>
        <button className='btn btn-warning btn-outline'>
          <GiBookshelf />
          Books
        </button>
      </Link>
      <Link to={"authors"}>
        <button className='btn btn-warning btn-outline'>
          <ImProfile />
          Authors
        </button>
      </Link>
      <Link to={"add-book"}>
        {" "}
        <button className='btn btn-warning btn-outline'>
          <BiBookAdd />
          Add Books
        </button>
      </Link>
    </div>
  );
}

export default Home;
