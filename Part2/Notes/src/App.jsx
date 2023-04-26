/** @format */

import { useState, useEffect } from "react";
import Note from "./components/Note";
import "./index.css";

import noteService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        alert(`the note '${note.content}' was already deleted from server`);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div className='p-7'>
      <h1 className=' text-5xl pt-4 pb-4'>Notes</h1>
      <div>
        <button
          onClick={() => setShowAll(!showAll)}
          className=' rounded-md text-sm p-2 mb-4 border-gray-500 border-2 border-solid bg-slate-100 hover:bg-slate-500 hover:text-white '>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul className=' text-2xl pt-2 pb-2 font-thin'>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
          className='text-sm p-2 mb-4 border-gray-500 border-2 border-solid bg-slate-100 hover:bg-slate-500 hover:text-white'
        />
        <button
          type='submit'
          className=' text-sm p-2 mb-4 border-gray-500 border-2 border-solid bg-slate-100 hover:bg-slate-500 hover:text-white'>
          save
        </button>
      </form>
    </div>
  );
};

export default App;
