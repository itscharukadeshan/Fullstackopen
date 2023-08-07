/** @format */
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className='navbar bg-base-100'>
      <div className='flex-1'>
        <Link to={"/"}>
          <div className='btn btn-ghost normal-case text-xl font-bold'>
            Library
          </div>
        </Link>
      </div>
      <div className='flex-none font-bold'>
        <ul className='menu menu-horizontal gap-2 px-1'>
          <li className=' hover:underline'>
            <Link to={"books"}>Books</Link>
          </li>
          <li className=' hover:underline'>
            <Link to={"authors"}>Authors</Link>
          </li>
          <li className=' hover:underline'>
            <Link to={"add-book"}>Add book</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
