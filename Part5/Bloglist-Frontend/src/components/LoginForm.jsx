import React from 'react'

function LoginForm() {
  return (
    <div className="pl-2">
      <h2 className="py-6 font-mono font-bold text-2xl">Log in to blog list</h2>
      <form
        className="flex flex-col gap-4 justify-center"
        action="http://localhost:3000/api/users"
        method="post"
      >
        <input
          type="text"
          placeholder="Type username here"
          className="input input-bordered input-info w-full max-w-xs"
        />
        <input
          type="password"
          placeholder="Type password here"
          className="input input-bordered input-info w-full max-w-xs"
        />
        <button type="submit" className="btn btn-outline btn-accent w-fit my-6">
          Log in
        </button>
      </form>
    </div>
  )
}

export default LoginForm
