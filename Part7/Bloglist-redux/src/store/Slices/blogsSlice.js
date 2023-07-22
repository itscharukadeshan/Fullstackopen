import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  blogs: [],
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      state.blogs = action.payload
    },
    updateBlogLikes(state, action) {
      const { blogId, likes } = action.payload
      const blogIndex = state.blogs.findIndex((blog) => blog.id === blogId)
      if (blogIndex !== -1) {
        state.blogs[blogIndex].likes = likes
      }
    },
    deleteBlog(state, action) {
      const blogId = action.payload
      state.blogs = state.blogs.filter((blog) => blog.id !== blogId)
    },
  },
})

export const { setBlogs, updateBlogLikes, deleteBlog } = blogSlice.actions
export default blogSlice.reducer
