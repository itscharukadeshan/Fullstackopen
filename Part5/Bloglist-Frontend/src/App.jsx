import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
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
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
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
    return <LoginForm onLogin={handleLogin} />
  }

  return (
    <div className="pl-2 pt-6">
      <div className="pb-6 text-2xl flex flex-row items-center gap-4 border-b-2 border-gray-500">
        <div>
          {user.name} is logged in{'  '}
        </div>
        <button
          className="btn btn-xs btn-outline btn-warning  "
          onClick={handleLogout}
        >
          Logout
        </button>{' '}
      </div>
      <h2 className="py-6 font-mono font-bold text-4xl">blogs</h2>
      <div className=" font-bold py-2">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default App
