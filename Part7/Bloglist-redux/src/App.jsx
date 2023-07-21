import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'

const App = () => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState('')

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData')
    if (storedUserData) {
      const userData = JSON.parse(storedUserData)
      setUser(userData)
      setToken(`Bearer ${userData.token}`)
    }
  }, [])

  const handleLogin = async (userData) => {
    await setUser(userData)
    localStorage.setItem('userData', JSON.stringify(userData))
  }
  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('userData')
  }

  if (user === null) {
    return (
      <>
        <LoginForm onLogin={handleLogin} />
        <Notification />
      </>
    )
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
            {user.name} is logged in{'  '}
          </div>
          <button
            className="btn btn-xs btn-outline btn-warning"
            onClick={handleLogout}
          >
            Logout
          </button>{' '}
        </div>
      </div>
      <Notification />
    </>
  )
}

export default App
