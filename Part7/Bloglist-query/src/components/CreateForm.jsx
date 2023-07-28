import React, { useState } from 'react'
import blogService from '../services/blogs'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNotification } from '../hooks/useNotification'

function CreateForm({ token }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { notifications, addNotification } = useNotification()

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
      addNotification(`Title, Author, and URL must be provided`, 'error')
      return
    }

    setIsLoading(true)

    try {
      const response = await blogService.create(newPost, token)
      if (response) {
        addNotification(
          `New blog created: ${newPost.title} by ${newPost.author}`,
          'success'
        )
      }
    } catch (error) {
      addNotification(`Check the data and try again`, 'error')
    } finally {
      setIsLoading(false)
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
                {isLoading ? (
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

      <ToastContainer />
    </>
  )
}

export default CreateForm
