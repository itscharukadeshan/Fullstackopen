import React, { useState } from 'react'
import blogService from '../services/blogs'

import 'react-toastify/dist/ReactToastify.css'
import { useNotification } from '../hooks/useNotification'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const Blog = ({ token }) => {
  const { notifications, addNotification } = useNotification()
  const [blogVisibilities, setBlogVisibilities] = useState([])

  const {
    data: blogs,
    isLoading,
    error,
    refetch,
  } = useQuery('blogs', () => blogService.getAll())

  const queryClient = useQueryClient()

  const handleVisibility = (index) => {
    const updatedVisibilities = [...blogVisibilities]
    updatedVisibilities[index] = !updatedVisibilities[index]
    setBlogVisibilities(updatedVisibilities)
  }

  const updateLikeMutation = useMutation(
    (updatedBlog) =>
      blogService.updateLikes(updatedBlog.id, updatedBlog, token, 'add-like'),
    {
      onMutate: (variables) => {
        queryClient.setQueryData('blogs', (oldData) => {
          return oldData.map((blog) =>
            blog.id === variables.id ? { ...blog, likes: blog.likes + 1 } : blog
          )
        })
      },

      onSuccess: () => {
        queryClient.invalidateQueries('blogs')
      },
    }
  )
  const deleteBlogMutation = useMutation(
    (blogId) => blogService.remove(blogId, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('blogs')
      },
      onError: (error) => {
        addNotification(`Sorry, unable to delete this blog`, 'error')
      },
    }
  )

  const handleUpdate = async (blog) => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
      }

      const response = await updateLikeMutation.mutateAsync(updatedBlog)
    } catch (error) {
      addNotification(`Sorry, likes are not accepted today`, 'error')
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
      const response = await deleteBlogMutation.mutateAsync(blog.id)
    } catch (error) {}
  }

  return (
    <div className="flex flex-col my-4">
      {isLoading ? (
        <span className="loading loading-bars loading-md"></span>
      ) : error ? (
        <div className="text-sm">Error: {error.message}</div>
      ) : (
        blogs.map((blog, index) => (
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
                <h3 className="font-normal">Likes {blog.likes}</h3>
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
        ))
      )}
    </div>
  )
}

export default Blog
