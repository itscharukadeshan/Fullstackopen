// notificationSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addBlog(state, action) {
      state.notifications.push(action.payload)
    },
    removeBlog(state, action) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      )
    },
  },
})

export const { addBlog, removeBlog } = blogsSlice.actions
export default blogsSlice.reducer
