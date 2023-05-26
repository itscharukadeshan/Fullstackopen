const Blog = require('../models/blog')


const nonExistingId = async () => {

  const blog = new Blog({

    title: 'First Blog Post',
    author: 'John Doe',
    url: 'https://example.com/first-post',
    likes: 10,
  })
  await blog.save()
  await blog.deleteOne()

  return blog.id
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  nonExistingId, blogsInDb
}