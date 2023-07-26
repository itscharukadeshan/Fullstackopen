import React from 'react'
import { useEffect, useState } from 'react'
import userService from '../services/users'
import { useDispatch, useSelector } from 'react-redux'
import { setUsers } from '../store/Slices/usersSlice'

function Profile() {
  const users = useSelector((state) => state.users.users)

  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      const users = await userService.getAll()
      dispatch(setUsers(users))
    } catch (error) {
      dispatch(handleNotification('Failed to get users', 'error'))
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <h2 className="my-4 text-3xl ml-5 font-bold">Users</h2>
      <ul className="menu w-96 rounded-box my-8 font-bold">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex flex-row w-56 justify-between gap-0 "
          >
            <div>{user.name}</div>
            <div>{user.blogs.length}</div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Profile
