import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Profile() {
  const { id } = useParams()
  const users = useSelector((state) => state.users.users)
  const user = users.find((user) => user.id === id)
  const blogs = user.blogs

  const [isLoading, setIsLoading] = useState(false)

  if (!user) {
    return <p>User not found!</p>
  }

  return (
    <>
      <h2 className="my-4 text-3xl ml-5 font-bold">{user.name}</h2>
      <h3 className="ml-5 font-mono my-4">Added blogs</h3>
      {blogs.map((blog) => (
        <ul key={blog.id} className="menu w-96 rounded-box my-4 font-bold">
          <Link to={`/blogs/${blog.id}`}>
            <li className="flex flex-row w-56 justify-between gap-0 ">
              <h3>{blog.title}</h3>
            </li>
          </Link>
        </ul>
      ))}
    </>
  )
}

export default Profile
