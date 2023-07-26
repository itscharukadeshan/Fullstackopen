import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import blogService from '../services/blogs'

import { updateBlogComments } from '../store/Slices/blogsSlice'

export default function Blog() {
  const dispatch = useDispatch()

  const [input, setInput] = useState('')
  const blogs = useSelector((state) => state.blogs.blogs)

  const { id } = useParams()

  const blog = blogs.find((blog) => blog.id === id)
  const comments = blog.comments || []

  if (!blog) {
    return <></>
  }
  const handleInput = (event) => {
    event.preventDefault()
    setInput(event.target.value)
  }
  const handleSubmit = async () => {
    const response = await blogService.addComment(id, input)
    dispatch(updateBlogComments({ blogId: id, comments: response }))
    setInput('')
  }
  return (
    <>
      <div className="card w-96 bg-gray-800 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-4xl">{blog.title}</h2>
          <p className="font-mono">Author {blog.author}</p>
          <p className="font-mono">Url {blog.url}</p>
          <div className="card-actions justify-end">
            by
            <Link to={`/users/${blog.user[0].id}`}>
              <div className="underline hover:text-accent">
                {blog.user[0].username}
              </div>
            </Link>
          </div>
        </div>
      </div>
      <h3 className="text-xl font-bold">Comments</h3>
      <input
        onChange={handleInput}
        value={input}
        type="text"
        className="input input-sm  input-accent rounded-none"
      />
      <button
        value={input}
        onClick={handleSubmit}
        className="btn btn-sm btn-outline"
      >
        Add comment
      </button>
      {comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.text}</p>
        </div>
      ))}
    </>
  )
}
