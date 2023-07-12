/** @format */

import { useDispatch } from "react-redux";
import { createNote } from "../reducers/noteReducer";

const NewNote = (props) => {
  const dispatch = useDispatch();

  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    dispatch(createNote(content));
  };

  return (
    <form className='my-8 flex flex-row items-center' onSubmit={addNote}>
      <input
        className='input input-sm input-bordered w-full max-w-xs'
        name='note'
      />
      <button className='font-mono ml-2 btn btn-sm btn-outline' type='submit'>
        add
      </button>
    </form>
  );
};

export default NewNote;
