import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import userService from '../services/users'
import { handleNotification } from '../store/Slices/notificationSlice'
import { updateUser } from '../store/Slices/usersSlice'

function Profile() {
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState([])

  const { id } = useParams()
  const dispatch = useDispatch()

  const users = useSelector((state) => state.users.users)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    setIsLoading(true)

    try {
      let user = await userService.getOne(id)
      setUser(user)
      setBlogs(user.blogs)
      dispatch(updateUser(id, user))

      if (user.length === 0) {
        return <>User not found</>
      }
    } catch (err) {
      dispatch(handleNotification('Something went wrong', 'error'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h2 className="my-12 text-3xl ml-5 font-bold">{user.name}</h2>
      <div className="bg-base p-6 w-full rounded-lg shadow-lg">
        <h3 className="ml-5 font-mono menu-title mt-15">
          Added blogs by {user.name}
        </h3>

        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <ul key={blog.id} className="menu  w-96 rounded-box mt-2 font-bold">
              <Link to={`/blogs/${blog.id}`}>
                <li className="flex flex-row w-56 justify-between gap-0 underline">
                  <h3>{blog.title}</h3>
                </li>
              </Link>
            </ul>
          ))
        ) : (
          <p>No blogs for this user</p>
        )}
      </div>
    </div>
  )
}

export default Profile
