const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let noteObject = new Blog(initialNotes[0])
  await noteObject.save()
  noteObject = new Blog(initialNotes[1])
  await noteObject.save()
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs have unique ids', async () => {
  const response = await api.get('api/blogs').expect(200)

  expect(response.body).toBeDefined()
  expect(response.body.length).toBeGreaterThan(0)

  const idList = response.body.map((blog) => blog.id)

  expect(idList.length).toBeGreaterThan(0)

  const hasDuplicates = idList.some((id, index) => idList.indexOf(id) !== index)

  expect(hasDuplicates).toBe(false)
})



afterAll(async () => {
  await mongoose.connection.close()
})