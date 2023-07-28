const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

const initialUsers = [
  {
    name: 'lily pichu',
    username: 'lily',
    password: 'daviky',
  },
  {
    name: 'dan del',
    username: 'dan11',
    password: 'del11',
  },
]

beforeEach(async () => {
  await User.deleteMany({})

  let userObject = new User(initialUsers[0])
  await userObject.save()

  userObject = new User(initialUsers[1])
  await userObject.save()
}, 10000)

describe('User crud tests', () => {
  test('given correct format create user without problem', async () => {
    const user = {
      name: 'crystal',
      username: 'crystal11',
      password: '1234',
    }
    await api

      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    const users = await response.body

    const createdUser = await users.find(
      (users) => users.name === user.name && users.username === user.username
    )

    expect(createdUser.name).toBe(user.name)
    expect(createdUser.username).toBe(user.username)
  })
  test('got the users correctly', async () => {
    const response = await api.get('/api/users')
    const users = await response.body

    expect(users.length).toBe(2)
  })
})

describe('Users checks', () => {
  test('check Username and password are required and give error 400 | working ', async () => {
    const invalidUser = [
      {
        name: 'i dont need username',
        password: '1234',
      },
      {
        name: 'i dont need password',
        username: 'my username',
      },
    ]

    let response = await api.post('/api/users').send(invalidUser[1]).expect(400)

    expect(response.body.error).toMatch(/Username and password are required/)

    response = await api.post('/api/users').send(invalidUser[2]).expect(400)

    expect(response.body.error).toMatch(/Username and password are required/)
  })

  test('Check for username already exist and give error 400 | Working ', async () => {
    const existingUser = {
      name: 'lily pichu',
      username: 'lily',
      password: 'daviky',
    }
    const response = await api

      .post('/api/users')
      .send(existingUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toMatch(/username already exists/)
  })
  test('Check Password and username should be more than 3 characters long give error 400 | Working', async () => {
    const invalidUser = [
      {
        name: 'lord',
        password: 'lorad11',
        username: 'tt',
      },
      {
        name: 'ed sheran',
        password: 'tt',
        username: 'daviky',
      },
    ]

    let response = await api.post('/api/users').send(invalidUser[0]).expect(400)

    expect(response.body.error).toMatch(
      /Password and username must be at least 3 characters long/
    )

    response = await api.post('/api/users').send(invalidUser[1]).expect(400)

    expect(response.body.error).toMatch(
      /Password and username must be at least 3 characters long/
    )
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
