import BlogList from './components/BlogList'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from './store/Slices/loginSlice'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Users from './components/Users'
import Profile from './components/Profile'
import LogOut from './components/LogOut'

import { Routes, Route } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.login.user)
  const token = useSelector((state) => state.login.token)

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    dispatch(logOut())
  }

  if (user === null) {
    return (
      <>
        <LoginForm />
        <Notification />
      </>
    )
  }

  return (
    <>
      <NavBar />
      <main className="h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CreateForm token={token} />
                <BlogList token={token} />
                <LogOut user={user} handleLogout={handleLogout} />
              </>
            }
          />
          <Route path="users" element={<Users />}></Route>
          <Route path="users/:id" element={<Profile />}></Route>{' '}
          <Route path="blogs/:id" element={<Blog />}></Route>
        </Routes>
      </main>

      <Notification />

      <Footer />
    </>
  )
}

export default App
