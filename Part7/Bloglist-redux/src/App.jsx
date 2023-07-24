import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from './store/Slices/loginSlice'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.login.user)
  const token = useSelector((state) => state.login.token)

  const handleLogout = () => {
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
          <div>{user.name} is logged in </div>
          <button
            className="btn btn-xs btn-outline btn-warning"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <Notification />
    </>
  )
}

export default App
