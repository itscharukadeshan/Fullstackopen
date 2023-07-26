import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Blog() {
  const blogs = useSelector((state) => state.blogs.blogs)
  const { id } = useParams()
  const blog = blogs.find((blog) => blog.id === id)

  if (!blog) {
    return <></>
  }

  return (
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
  )
}
