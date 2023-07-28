import React, { useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import { UserContext } from './state/UserProvider'

const App = () => {
  const { state, dispatch } = useContext(UserContext)
  const { user, token } = state

  console.log(user)

  const handleLogin = async (userData) => {
    dispatch({ type: 'LOGIN', payload: { userData } })
    localStorage.setItem('userData', JSON.stringify(userData))
  }

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    localStorage.removeItem('userData')
  }

  if (user === null) {
    return <LoginForm onLogin={handleLogin} />
  }

  return (
    <>
      <div className="navbar bg-base-300">
        <a className="btn btn-ghost normal-case text-xl">Blogs</a>
      </div>
      <div className="pl-2 py-6 ">
        <div>
          <CreateForm token={token} />
        </div>
        <div>
          <div className=" font-bold py-2">
            <Blog token={token} />
          </div>
        </div>
        <div className="pt-12 text-2xl flex flex-row items-center gap-4">
          <div>
            {user.user.username} is logged in{'  '}
          </div>
          <button
            className="btn btn-xs btn-outline btn-warning"
            onClick={handleLogout}
          >
            Logout
          </button>{' '}
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default App
