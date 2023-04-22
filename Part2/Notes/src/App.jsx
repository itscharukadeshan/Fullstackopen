/** @format */

import { useState } from "react";
import Note from "./components/Note";
import "/src/index.css";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    setNotes(notes.concat(noteObject));
    setNewNote("");
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
          <Note key={note.id} note={note} />
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
