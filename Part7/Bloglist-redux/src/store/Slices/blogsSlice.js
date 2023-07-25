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
    addBlog(state, action) {
      state.blogs.push(action.payload)
    },
    updateBlogLikes(state, action) {
      const { blogId, likes } = action.payload

      const blog = state.blogs.find((b) => b.id === blogId)
      if (blog) {
        blog.likes = likes
      }
    },
    deleteBlog(state, action) {
      const blogId = action.payload
      state.blogs = state.blogs.filter((blog) => blog.id !== blogId)
    },
  },
})

export const { addBlog, setBlogs, updateBlogLikes, deleteBlog, findBlog } =
  blogSlice.actions
export default blogSlice.reducer
