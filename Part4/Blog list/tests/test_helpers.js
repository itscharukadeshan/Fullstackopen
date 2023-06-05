const Blog = require('../models/blog')
const User = require ('../models/user')
const jwt = require('jsonwebtoken')


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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map (user => user.toJSON())
}
const oneUserInDb = async () => {
  const user = await User.find([0])
  return user.map (user => user.toJSON())
}
const logInUser = async (username) => {
  try {
    const user = await User.findOne({ username })

    if (!user) {
      throw new Error('Invalid username or password')
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET)

    return token

  } catch (error) {
    console.error(error)
    throw new Error('Login failed')
  }
}



module.exports = {
  nonExistingId, blogsInDb,oneUserInDb,usersInDb,logInUser
}