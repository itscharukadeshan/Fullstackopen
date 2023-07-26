import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav className="navbar bg-base-300">
      <div className="flex flex-row w-full justify-between items-center px-4">
        <div className="btn btn-ghost normal-case text-xl">
          <Link to={'/'}>Blogs</Link>
        </div>
        <ul className="menu menu-horizontal px-1 ">
          <Link to={'/users'}>
            <li className="mx-2 btn btn-sm btn-ghost normal-case">Users</li>
          </Link>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
