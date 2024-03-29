import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'
import noteService from './services/notes'
import loginService from './services/login'
import Header from './components/Header'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const noteFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      noteService.setToken(user.token)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      setUser(user)
      toast.success(`${user.name} you're logged in`)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      toast.error(errorMessage)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addNote = (noteObject) => {
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
      noteFormRef.current.toggleVisibility()
      toast.success(`note created`)
    })
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }
    const isImportant = changedNote.important

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
        if (isImportant) {
          toast.success('Note marked as important')
        } else {
          toast.success('Note marked as not important')
        }
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        toast.error('Note was already removed from server')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  return (
    <div>
      <Header />

      <div className="mx-20">
        <Notification message={errorMessage} />

        {!user && (
          <Togglable buttonLabel="log in">
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          </Togglable>
        )}
        {user && (
          <div>
            <p className=" my-2 text-sm text-gray-400">{user.name} logged in</p>
            <Togglable buttonLabel="new note" ref={noteFormRef}>
              <NoteForm createNote={addNote} />
            </Togglable>
          </div>
        )}

        <div>
          <a
            className=" mt-8 mb-16 w-fit flex items-center justify-center gap-2 rounded-xl border-4 border-black bg-blue-100 px-3 py-2 text-sm shadow-[6px_6px_0_0_#000] transition hover:cursor-pointer hover:shadow-none focus:outline-none focus:ring active:bg-blue-50"
            onClick={() => setShowAll(!showAll)}
          >
            show {showAll ? 'important' : 'all'}
          </a>
        </div>
        <ul>
          {notesToShow.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
        </ul>
        <ToastContainer />
        <Footer />
      </div>
    </div>
  )
}

export default App
