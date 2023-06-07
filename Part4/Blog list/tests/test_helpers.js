const Blog = require('../models/blog')
const User = require ('../models/user')


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

const loginUserAndGetToken = async (api, user) => {
  await api
    .post('/api/users')
    .send(user)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const loginUserResponse = await api
    .post('/api/login')
    .send(user)
    .expect(200)

  return loginUserResponse.body.token
}




module.exports = {
  nonExistingId, blogsInDb,oneUserInDb,usersInDb,loginUserAndGetToken
}