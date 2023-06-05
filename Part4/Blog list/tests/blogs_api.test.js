const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helpers')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

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
const initialUser = [
  { username:'John Doe' ,
    name : 'John Doe',
    password : '1234'
  },
  { username:'Jane Smith' ,
    name : 'Jane Smith',
    password : '4563'
  }
]

beforeEach(async () => {

  await Blog.deleteMany({})

  let userObject = new User (initialUser[0])
  await userObject.save()

  userObject = new User (initialUser[1])
  await userObject.save()

  let blogObject = new Blog(initialBlogs[0])
  await blogObject .save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
}, 10000)

describe ('API data CRUD test',() => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs have unique ids', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()

    const idList = await response.body.map((blog) => blog.id)

    expect(idList.length).toBeGreaterThan(0)

    const hasDuplicates = await idList.some(
      (id, index) => idList.indexOf(id) !== index
    )

    expect(hasDuplicates).toBe(false)
  })

  test('successfully creates a new blog post', async () => {


    const token = await helper.logInUser(initialUser[1].username, initialUser[1].password)

    const newBlogPost = {
      title: 'Second Blog Post',
      author: 'John Doe',
      url: 'https://example.com/second-post',
      likes: 50,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const blogs = response.body

    const createdBlog = blogs.find(
      (blog) =>
        blog.title === newBlogPost.title &&
      blog.author === newBlogPost.author &&
      blog.url === newBlogPost.url &&
      blog.likes === newBlogPost.likes
    )

    expect(createdBlog.title).toBe(newBlogPost.title)
    expect(createdBlog.author).toBe(newBlogPost.author)
    expect(createdBlog.url).toBe(newBlogPost.url)
    expect(createdBlog.likes).toBe(newBlogPost.likes)
  })

  test('likes have default values of zero', async () => {
    const postWithoutLikes = {
      title: 'third Blog Post',
      author: 'Bob boson',
      url: 'https://example.com/third-post',
    }

    await api
      .post('/api/blogs')
      .send(postWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const blogs = response.body

    const allBlogsHaveLikes = blogs.every(
      (blog) =>
        typeof blog.likes !== 'undefined' && blog.likes >= 0 && blogs.length >= 2
    )

    expect(allBlogsHaveLikes).toBe(true)
  })

  test('title and url are required working', async () => {
    const validPost = {
      title: 'Valid Post',
      author: 'John Doe',
      url: 'https://example.com/valid-post',
      likes: 10,
    }

    const invalidPosts = [
      {
        author: 'Jane Smith',
        url: 'https://example.com/invalid-post',
        likes: 5,
      },
      {
        title: 'Invalid Post',
        author: 'Bob Johnson',
        likes: 8,
      },
    ]

    await api
      .post('/api/blogs')
      .send(validPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/blogs')
      .send(invalidPosts[0])
      .expect(400)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/blogs')
      .send(invalidPosts[1])
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('succeeds with status code 204 if id is valid', async () => {

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]


    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

    const id = blogsAtEnd.map(r => r.id)

    expect(id).not.toContain(blogToDelete.content)

  })

  test('update the blog post', async () => {

    const updateBlog = {
      title: 'This is updated post',
      author: 'John del Doe',
      url: 'https://example.com/valid-post',
      likes: 100,
    }

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updateBlog)
      .expect(204)

    const response = await api.get('/api/blogs')
    const blogs = response.body

    const updatedBlog = blogs.find((blog) => blog.id === blogToUpdate.id)

    expect(updatedBlog.title).toBe(updateBlog.title)
    expect(updatedBlog.author).toBe(updateBlog.author)
    expect(updatedBlog.url).toBe(updateBlog.url)
    expect(updatedBlog.likes).toEqual(updateBlog.likes)
  })



})


afterAll(async () => {
  await mongoose.connection.close()
})
