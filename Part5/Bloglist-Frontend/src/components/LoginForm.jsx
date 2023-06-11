import React from 'react'
import { useState } from 'react'

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const credentials = {
      username,
      password,
    }
    setPassword('')
    setUsername('')

    console.log(credentials)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div className="pl-2">
      <h2 className="py-6 font-mono font-bold text-2xl">Log in to blog list</h2>
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
        <button type="submit" className="btn btn-outline btn-accent w-fit my-6">
          Log in
        </button>
      </form>
    </div>
  )
}

export default LoginForm
