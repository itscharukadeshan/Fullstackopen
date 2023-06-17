const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div className="w-1/4 pt-8">
      <h2 className="text-xl font-sans font-bold pb-4">Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="py-2 font-mono text-lg">
          Username
          <input
            className="relative block overflow-hidden border-b border-gray-600 bg-transparent focus-within:border-blue-600 my-4"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="py-2 font-mono text-lg">
          Password
          <input
            type="password"
            className="relative block overflow-hidden border-b border-gray-600 bg-transparent focus-within:border-blue-600 my-4"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <a
          class="inline-block rounded border border-current px-8 py-3 text-sm font-medium text-indigo-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500 mt-4"
          type="submit"
        >
          Login
        </a>
      </form>
    </div>
  )
}

export default LoginForm
