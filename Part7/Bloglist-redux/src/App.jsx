import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from './store/Slices/loginSlice'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Users from './components/Users'

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
      <Routes>
        <Route
          path="/"
          element={
            <>
              <CreateForm token={token} />
              <Blog token={token} />
            </>
          }
        />
        <Route path="users" element={<Users />}></Route>
      </Routes>

      <Footer user={user} handleLogout={handleLogout} />
      <Notification />
    </>
  )
}

export default App
