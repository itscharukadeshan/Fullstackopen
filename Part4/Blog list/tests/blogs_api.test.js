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


beforeEach(async () => {
  await Blog.deleteMany({})

  let noteObject = new Blog(initialBlogs[0])
  await noteObject.save()

  noteObject = new Blog(initialBlogs[1])
  await noteObject.save()

},10000)

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

  const newBlogPost = {
    title: 'Second Blog Post',
    author: 'Jain Doe',
    url: 'https://example.com/second-post',
    likes: 50,
  }

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

test ('likes have default values of zero',async () => {

  const postWithoutLikes = {

    title: 'third Blog Post',
    author: 'Bob boson',
    url: 'https://example.com/third-post'
  }

  await api.post ('/api/blogs')
    .send (postWithoutLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const blogs = response.body

  const allBlogsHaveLikes = blogs.every(blog => typeof blog.likes !== 'undefined' && blog.likes >= 0 && blogs.length >=2 )

  expect (allBlogsHaveLikes).toBe(true)


})

test ('title and url is required',async () => {

  const invalidPosts = [
    {
      author: 'jenna ortega',
      url: 'https://example.com/slay-post',
      likes: 10,
    },
    {
      title: 'pray post',
      url: 'https://example.com/pray-post',
      likes: 5,
    }, {

      url: 'https://example.com/gay-post',
      likes: 68,
    },
  ]
  await api.post ('/api/blogs')
    .send (invalidPosts[0])
    .expect(400)
    .expect('Content-Type', /application\/json/)

  await api.post ('/api/blogs')
    .send (invalidPosts[1])
    .expect(400)
    .expect('Content-Type', /application\/json/)

  await api.post ('/api/blogs')
    .send (invalidPosts[2])
    .expect(400)
    .expect('Content-Type', /application\/json/)


})

afterAll(async () => {
  await mongoose.connection.close()
})