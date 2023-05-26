const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'First Blog Post',
    author: 'John Doe',
    url: 'https://example.com/first-post',
    likes: 10,
  },
  {
    title: 'Second Blog Post',
    author: 'Jane Smith',
    url: 'https://example.com/second-post',
    likes: 5,
  },
]

const newBlogPost = {
  title: 'Second Blog Post',
  author: 'Jain Doe',
  url: 'https://example.com/second-post',
  likes: 50,
}

beforeEach(async () => {
  await Blog.deleteMany({})

  let noteObject = new Blog(initialBlogs[0])
  await noteObject.save()

  noteObject = new Blog(initialBlogs[1])
  await noteObject.save()

},10000)

afterEach(async () => {
  await Blog.deleteMany({})
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs have unique ids', async () => {

  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()

  const idList =  await response.body.map((blog) => blog.id)

  expect(idList.length).toBeGreaterThan(0)

  const hasDuplicates = await idList.some((id, index) => idList.indexOf(id) !== index)

  expect(hasDuplicates).toBe(false)
})

test ('successfully creates a new blog post',async() => {

  await api.post ('/api/blogs')
    .send (newBlogPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const blogs = response.body


  const createdBlog = blogs.find(blog =>

    blog.title === newBlogPost.title &&
    blog.author === newBlogPost.author &&
    blog.url === newBlogPost.url &&
     blog.likes === newBlogPost.likes)


  expect(createdBlog.title).toBe(newBlogPost.title)
  expect(createdBlog.author).toBe(newBlogPost.author)
  expect(createdBlog.url).toBe(newBlogPost.url)
  expect(createdBlog.likes).toBe(newBlogPost.likes)


})



afterAll(async () => {
  await mongoose.connection.close()
})