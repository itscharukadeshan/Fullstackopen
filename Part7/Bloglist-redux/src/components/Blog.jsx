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
    <div>
      <h1> {blog.title}</h1>
      <div>{blog.author}</div>
      <div>{blog.url}</div>
      <div>{blog.user[0].name}</div>
    </div>
  )
}
