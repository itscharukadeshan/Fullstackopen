import React from 'react'
import { useState } from 'react'
import login from '../services/login'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const credentials = {
      username,
      password,
    }
    setPassword('')
    setUsername('')
    setIsLoggingIn(true)
    try {
      const userData = await login(credentials)
      toast.success('Login successfully')
      onLogin(userData)
    } catch (error) {
      toast.error('Login failed. Please check your credentials.')
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <>
      <div className="navbar bg-base-300">
        <a className="btn btn-ghost normal-case text-xl">Blogs</a>
      </div>
      <div className="pl-2">
        <h2 className="py-6 font-mono font-bold text-2xl">
          Log in to blog list
        </h2>
        <form
          className="flex flex-col gap-4 justify-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Type username here"
            className="input input-bordered input-info w-full max-w-xs"
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            type="password"
            placeholder="Type password here"
            className="input input-bordered input-info w-full max-w-xs"
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            type="submit"
            className="btn btn-outline btn-accent w-fit my-6"
          >
            {isLoggingIn ? (
              <>
                <span className="loading loading-spinner"></span> Logging in
              </>
            ) : (
              'Log in'
            )}
          </button>
          <ToastContainer />
        </form>
      </div>
    </>
  )
}

export default LoginForm
