const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

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
    response.status(404).json ({ error : 'user is not found' })
  }
})

usersRouter.delete('/:id', async (request, response) => {

  await User.findByIdAndRemove(request.params.id)

  response.status(204).json({ complete : 'user is deleted' })

})

module.exports = usersRouter