import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Blog = ({ token }) => {
  const [blogVisibilities, setBlogVisibilities] = useState([])
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs)
      setBlogVisibilities(new Array(blogs.length).fill(false))
    })
  }, [])

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const handleVisibility = (index) => {
    const updatedVisibilities = [...blogVisibilities]
    updatedVisibilities[index] = !updatedVisibilities[index]
    setBlogVisibilities(updatedVisibilities)
  }

  const handleUpdate = async (blog) => {
    try {
      const newPost = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
      }

      const response = await blogService.update(blog.id, newPost, token)
      if (response.data) {
        toast.success(`You liked ${blog.title}`)
      }
    } catch (error) {
      toast.error('Sorry, likes are not accepted today')
    }
  }

  const handleDelete = async (blog) => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this post?'
    )
    if (!confirmation) {
      return
    }

    try {
      const response = await blogService.remove(blog.id, token)
      if (response.data) {
        toast.success(`Deleted ${blog.title}`)
      }
    } catch (error) {
      toast.error(`Sorry, you can't delete this post`)
    }
  }

  return (
    <div className="flex flex-col my-4">
      {sortedBlogs.map((blog, index) => (
        <div
          key={blog.id}
          className="card w-96 bg-base-100 shadow-xl border-white border-solid border-2 border-opacity-10 indicator my-4"
        >
          <div className="card-body">
            <button
              className="indicator-item badge badge-primary"
              onClick={() => handleVisibility(index)}
            >
              {blogVisibilities[index] ? 'Hide' : 'Show'}
            </button>
            <div className="mb-2">
              <h2 className="card-title">{blog.title}</h2>
              <h3 className="font-normal">By {blog.author}</h3>
            </div>
            {blogVisibilities[index] && (
              <>
                <div className="mb-4">
                  <a href={blog.url}>{blog.url}</a>
                </div>
                {blog.user[0] && (
                  <div className="card-action justify-start font-mono font-normal">
                    Post by @{blog.user[0].username}
                  </div>
                )}
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-outline btn-accent"
                    onClick={() => handleUpdate(blog)}
                  >
                    Likes {blog.likes}
                  </button>
                  <button
                    className="btn btn-outline btn-warning"
                    onClick={() => handleDelete(blog)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}

      <ToastContainer />
    </div>
  )
}

export default Blog
