import React, { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function CreateForm({ token }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleCreate = async (event) => {
    event.preventDefault()

    const newPost = {
      title,
      author,
      url,
    }
    if ((!title, !author, !url)) {
      toast.error('Title , Author and url must be provided')
    }
    setIsLoggingIn(true)
    try {
      const response = blogService.create(newPost, token)
      if (response.data) {
        toast.success(`New blog created ${newPost.title} by ${newPost.author}`)
      }
    } catch (error) {
      toast.error('check the data and try again')
    } finally {
      setIsLoggingIn(false)
    }

    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return (
    <>
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
            value={title}
            onChange={handleTitleChange}
          />
          <input
            type="text"
            placeholder="Type author here"
            className="input input-bordered input-info w-full max-w-xs"
            value={author}
            onChange={handleAuthorChange}
          />
          <input
            type="url"
            placeholder="Type Url here"
            className="input input-bordered input-info w-full max-w-xs"
            value={url}
            onChange={handleUrlChange}
          />
          <button
            type="submit"
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
        </form>
        <ToastContainer />
      </div>
    </>
  )
}

export default CreateForm
