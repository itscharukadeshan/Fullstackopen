import React, { useEffect, useState } from 'react'
import blogService from '../services/blogs'

function CreateForm({ token }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleCreate = (event) => {
    event.preventDefault()

    const newPost = {
      title,
      author,
      url,
    }

    try {
      blogService.create(newPost, token)
    } catch (error) {
      console.log(error)
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
            Create Post
          </button>
        </form>
      </div>
    </>
  )
}

export default CreateForm
