import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload
    },
    updateUser(state, action) {
      const { userId, newUser } = action.payload

      const user = state.users.find((user) => user.id === userId)
      if (user) {
        user = newUser
      }
    },
  },
})

export const { setUsers, updateUser } = userSlice.actions
export default userSlice.reducer
