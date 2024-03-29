const Note = require('../models/note')
const User = require('../models/user')
const crypto = require('crypto')

const generateNonExistingId = () => {
  return crypto.randomBytes(12).toString('hex')
}
const generateNonExistingUserId = () => {
  return crypto.randomBytes(24).toString('hex')
}


const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true
  }
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
  generateNonExistingId,
  generateNonExistingUserId
}