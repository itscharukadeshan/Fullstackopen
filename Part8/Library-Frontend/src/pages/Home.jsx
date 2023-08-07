/** @format */
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className='flex flex-col items-center gap-4 my-24'>
      <Link to={"books"}>
        {" "}
        <button className='btn btn-warning btn-outline'>Books</button>
      </Link>
      <Link to={"authors"}>
        <button className='btn btn-warning btn-outline'>Authors</button>
      </Link>
      <Link to={"add-book"}>
        {" "}
        <button className='btn btn-warning btn-outline'>Add Books</button>
      </Link>
    </div>
  );
}

export default Home;
