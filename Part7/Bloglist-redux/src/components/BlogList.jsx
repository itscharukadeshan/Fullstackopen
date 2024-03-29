import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import blogService from '../services/blogs'
import { handleNotification } from '../store/Slices/notificationSlice'

import { Link } from 'react-router-dom'

import {
  setBlogs,
  updateBlogLikes,
  deleteBlog,
} from '../store/Slices/blogsSlice'

const BlogList = ({ token }) => {
  const blogs = useSelector((state) => state.blogs.blogs)

  const [blogVisibilities, setBlogVisibilities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [update, setUpdate] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    fetchBlogs()
  }, [update])

  const fetchBlogs = async () => {
    try {
      setIsLoading(true)
      const blogs = await blogService.getAll()
      const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
      dispatch(setBlogs(sortedBlogs))
    } catch (error) {
      dispatch(handleNotification('Failed to get blogs', 'error'))
    } finally {
      setIsLoading(false)
      setBlogVisibilities([])
    }
  }

  const handleVisibility = (index) => {
    const updatedVisibilities = [...blogVisibilities]
    updatedVisibilities[index] = !updatedVisibilities[index]
    setBlogVisibilities(updatedVisibilities)
  }

  const handleLikes = async (blog) => {
    setUpdate(true)
    try {
      const updatedLikes = {
        likes: blog.likes + 1,
      }

      const response = await blogService.updateLikes(
        blog.id,
        updatedLikes,
        token,
        'update-likes'
      )

      dispatch(updateBlogLikes({ blogId: blog.id, likes: response.likes }))

      if (response.likes) {
        dispatch(handleNotification('Liked', 'success'))
      }
    } catch (error) {
      dispatch(handleNotification('Sorry, something went wrong', 'error'))
    } finally {
      setUpdate(false)
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
      await blogService.remove(blog.id, token)

      dispatch(deleteBlog(blog.id))
    } catch (error) {
      dispatch(handleNotification(`sorry you can't delete this post`, 'error'))
    }
  }

  return (
    <div className="flex flex-col my-4">
      {blogs.map((blog, index) => (
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
              <Link to={`blogs/${blog.id}`}>
                <h2 className="card-title underline underline-offset-auto hover:text-accent">
                  {blog.title}
                </h2>
              </Link>
              <h3 className="font-normal">By {blog.author}</h3>
              <h3 className="font-normal">Likes {blog.likes}</h3>
            </div>
            {blogVisibilities[index] && (
              <>
                <div className="mb-4">
                  <a href={blog.url}>{blog.url}</a>
                </div>
                {blog.user[0] && (
                  <div className="card-action justify-start font-mono font-normal flex flex-row gap-2">
                    Post by{' '}
                    <Link to={`/users/${blog.user[0].id}`}>
                      <div className="underline underline-offset-2 hover:text-accent">
                        @{blog.user[0].username}
                      </div>
                    </Link>
                  </div>
                )}
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-outline btn-accent"
                    onClick={() => handleLikes(blog)}
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
    </div>
  )
}

export default BlogList
