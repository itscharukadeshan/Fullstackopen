/** @format */

import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

const Note = ({ note, handleClick }) => {
  return (
    <li className='text-md font-bold my-4' onClick={handleClick}>
      {note.content}
      <button
        className={`ml-4 btn btn-outline btn-sm lowercase ${
          note.important ? "btn-accent" : "btn-warning"
        }`}>
        {note.important ? "important" : "not important"}
      </button>
    </li>
  );
};

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => {
    if (state.filter === "ALL") {
      return state.notes;
    }
    return state.filter === "IMPORTANT"
      ? state.notes.filter((note) => note.important)
      : state.notes.filter((note) => !note.important);
  });

  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => dispatch(toggleImportanceOf(note.id))}
        />
      ))}
    </ul>
  );
};

export default Notes;
