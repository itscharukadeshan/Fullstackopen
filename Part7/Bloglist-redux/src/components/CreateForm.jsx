import React, { useState } from 'react'
import blogService from '../services/blogs'

import { showNotification } from '../store/Slices/notificationSlice'
import { useDispatch } from 'react-redux'

function CreateForm({ token }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const dispatch = useDispatch()

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleVisibility = () => {
    setShowForm(!showForm)
  }

  const handleCreate = async (event) => {
    event.preventDefault()

    const newPost = {
      title,
      author,
      url,
    }

    if (!title || !author || !url) {
      dispatch(
        showNotification({
          message: 'Title , Author and url should be provided',
          type: 'error',
        })
      )
    }

    setIsLoggingIn(true)

    try {
      const response = await blogService.create(newPost, token)
      if (response.data) {
        showNotification({
          message: `New blog created: ${newPost.title} by ${newPost.author}`,
          type: 'success',
        })
      }
    } catch (error) {
      dispatch(
        showNotification({
          message: 'Something went wrong check the data again',
          type: 'error',
        })
      )
    } finally {
      setIsLoggingIn(false)
    }

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <>
      {showForm ? (
        <div>
          <h2 className="py-6 font-mono font-bold text-3xl">Create new</h2>
          <form
            className="flex flex-col gap-4 justify-center"
            onSubmit={handleCreate}
          >
            <input
              type="text"
              placeholder="Type title here"
              className="input input-bordered input-info w-full max-w-xs"
              id="title"
              value={title}
              onChange={handleTitleChange}
            />
            <input
              type="text"
              placeholder="Type author here"
              className="input input-bordered input-info w-full max-w-xs"
              id="author"
              value={author}
              onChange={handleAuthorChange}
            />
            <input
              type="url"
              placeholder="Type URL here"
              className="input input-bordered input-info w-full max-w-xs"
              id="url"
              value={url}
              onChange={handleUrlChange}
            />
            <div className="flex flex-row gap-3">
              <button
                type="submit"
                id="submit"
                className="btn btn-outline btn-accent w-fit my-6"
              >
                {isLoggingIn ? (
                  <>
                    <span className="loading loading-spinner"></span> Creating
                  </>
                ) : (
                  'Create Post'
                )}
              </button>
              <button
                className="btn btn-outline btn-warning w-fit my-6"
                id="cancel"
                onClick={handleVisibility}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          className="btn btn-outline btn-accent w-fit my-6"
          id="new-blog"
          onClick={handleVisibility}
        >
          Create a post
        </button>
      )}
    </>
  )
}

export default CreateForm
