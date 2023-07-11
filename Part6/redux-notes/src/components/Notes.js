/** @format */

import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

const Note = ({ note, handleClick }) => {
  return (
    <li className='my-6' onClick={handleClick}>
      {note.content}
      <strong>
        {note.important ? (
          <button className=' ml-4 btn btn-success btn-sm lowercase'>
            Important
          </button>
        ) : (
          <button className='ml-4 btn btn-outline btn-sm lowercase'>
            not impotent
          </button>
        )}
      </strong>
    </li>
  );
};

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state);

  return (
    <ul className='text-xl py-8 '>
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
