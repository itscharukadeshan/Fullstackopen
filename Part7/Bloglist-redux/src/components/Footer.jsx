import React from 'react'

function Footer({ user, handleLogout }) {
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content absolute bottom-0">
      <div>
        <div className="p-4 text-2xl flex flex-row items-center gap-4">
          <div>{user.name} is logged in </div>
          <button
            className="btn btn-xs btn-outline btn-warning"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <p className="p-2">Copyright © 2023 </p>
      </div>
    </footer>
  )
}

export default Footer
