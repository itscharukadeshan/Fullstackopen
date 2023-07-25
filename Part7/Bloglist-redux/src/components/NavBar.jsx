import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className="navbar bg-base-300">
      <div className="flex flex-row w-full justify-between items-center px-4">
        <a className="btn btn-ghost normal-case text-xl">
          <Link to={'/'}>Blogs</Link>
        </a>
        <ul className="menu menu-horizontal px-1 ">
          <Link to={'/users'}>
            <li className="mx-2 btn btn-sm btn-ghost normal-case">Users</li>
          </Link>
          <Link to={'blogs'}>
            <li className="mx-2 btn btn-sm btn-ghost normal-case">Blogs</li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default NavBar
