/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";
import "/src/index.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/notes").then((response) => {
      console.log("promise fulfilled");
      setNotes(response.data);
    });
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    axios.post("http://localhost:3001/notes", noteObject).then((response) => {
      console.log(response);
    });
    setNotes(notes.concat(response.data));
    setNewNote("");
  };
  const toggleImportanceOf = (id) => {
    console.log("importance of " + id + " needs to be toggled");
  };
  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

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
      <ul className=' text-md pt-2 pb-2 font-thin'>
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
