import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from './store/Slices/loginSlice'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

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

      <div className="pl-2 py-6 ">
        <div>
          <CreateForm token={token} />
        </div>
        <div>
          <div className=" font-bold py-2">
            <Blog token={token} />
          </div>
        </div>
        <Footer user={user} handleLogout={handleLogout} />
      </div>
      <Notification />
    </>
  )
}

export default App
