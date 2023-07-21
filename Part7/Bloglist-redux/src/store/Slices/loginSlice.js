// notificationSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login(state, action) {
      state.notifications.push(action.payload)
    },
    logOut(state, action) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      )
    },
  },
})

export const { login, logOut } = loginSlice.actions
export default loginSlice.reducer
