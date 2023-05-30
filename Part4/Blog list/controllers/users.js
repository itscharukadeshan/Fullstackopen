const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  try {

    const userNameCheck = await User.findOne({ username: request.body.username })

    if (userNameCheck){

      return response.status(400).json({ error: 'username already exists' })
    }

    if (!request.body.username || !request.body.password ) {

      return response.status(400).json({ error: 'Username and password are required' })
    }
    if (request.body.password.length < 3 || request.body.username.length < 3) {
      return response.status(400).json({ error: 'Password and username must be at least 3 characters long' })
    }

    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    return response.status(201).json(savedUser)
  } catch (error) {
    return response.status(500).json({ error: 'Internal Server Error' })
  }
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
    response.status(404).json ({ error : 'user is not found' })
  }
})

usersRouter.delete('/:id', async (request, response) => {

  await User.findByIdAndRemove(request.params.id)

  response.status(204).send({ complete : 'user is deleted' })

})

module.exports = usersRouter