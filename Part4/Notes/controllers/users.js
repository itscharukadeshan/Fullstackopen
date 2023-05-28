const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!username || !password) {
    response.status(400).json({ error:'username and password required' })
  }
  if (!username <=3 ) {
    response.status(400).json({ error:'username and password must be atleast 3 characters long' })
  }
  if ( !password <=3) {
    response.status(400).json({ error:'username and password must be atleast 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)


})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})
usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  if (user) {
    response.json(user)
  } else {
    response.status(404).json ({ error : 'note is not found' })
  }
})

module.exports = usersRouter