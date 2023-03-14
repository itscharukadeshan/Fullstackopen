/** @format */
import React from "react";
import { useState } from "react";

import Note from "./components/Note";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNotes, setNewNotes] = useState("new notes");
  const addNotes = (event) => {
    event.preventDefault();
    console.log("Button clicked", event.target);
  };
  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        <ul>
          {notes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </ul>
      </ul>
      <form onSubmit={addNotes}>
        <input value={newNotes} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
    </div>
  );
};

export default App;
