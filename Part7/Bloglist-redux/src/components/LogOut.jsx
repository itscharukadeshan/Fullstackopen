import React from 'react'

export default function LogOut({ user, handleLogout }) {
  return (
    <div className="p-4 text-2xl flex flex-row items-center gap-4">
      <div>{user.name} is logged in </div>
      <button
        className="btn btn-xs btn-outline btn-warning"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  )
}
