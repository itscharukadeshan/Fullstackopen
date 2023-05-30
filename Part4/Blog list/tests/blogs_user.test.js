const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helpers')

const api = supertest(app)

const User = require('../models/user')

const initialUsers = [
  {
    name : 'lily pichu',
    username : 'lily',
    password : 'daviky'
  },
  {
    name : 'dan del',
    username : 'dan11',
    password : 'del11'
  },
]

beforeEach(async () => {
  await User.deleteMany({})

  let userObject = new User(initialUsers[0])
  await userObject.save()

  userObject = new User(initialUsers[1])
  await userObject.save()
})

describe ('User crud tests', () => {

  test ('given correct format create user without problem',async() => {

    const user =  {
      name : 'crystal',
      username : 'crystal11',
      password : '1234'
    }
    await api

      .post ('/api/blogs')
      .send (user)
      .expect (201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    const users = await response.body

    const createdUser = await response.find (
      users.name === user.name &&
      users.username === user.username
    )

    expect ( createdUser.name).toBe (user.name)
    expect (createdUser.username).toBe(user.username)

  })
  test ('got the users correctly',async () => {
    const response = await api.get('/api/users')
    const users = await response.body

    expect(users.length).toBe(2)


  })
})

describe ('Users checks', () => {

  test ('check Username and password are required and give error 400 | working ', async () => {



  })

  test ('Check for username already exist and give error 400 | Working ', async () => {



  })
  test ('Check Password and username should be more than 3 characters long give error 400 | Working', async () => {



  })

})