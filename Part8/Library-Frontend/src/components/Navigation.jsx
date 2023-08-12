/** @format */

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";

function Navigation({ token, setToken }) {
  const client = useApolloClient();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <nav className='navbar bg-base-100'>
      <div className='flex-1'>
        <Link to='/'>
          <div className='btn btn-ghost normal-case text-xl font-bold'>
            Library
          </div>
        </Link>
      </div>

      <div className='flex-none font-bold'>
        <ul className='menu menu-horizontal gap-2 px-1'>
          <li className='hover:underline'>
            <Link to='/books'>Books</Link>
          </li>
          <li className='hover:underline'>
            <Link to='/authors'>Authors</Link>
          </li>

          {isLoggedIn ? (
            <>
              <li className='hover:underline'>
                <Link to='/add-book'>Add Book</Link>
              </li>
              <li className='hover:underline'>
                <Link to='/recondition'>Recondition</Link>
              </li>
              <li onClick={logout} className='hover:underline'>
                <Link to='/'>Log out</Link>
              </li>
            </>
          ) : (
            <>
              <li className='hover:underline'>
                <Link to='/login'>Log in</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
