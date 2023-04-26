/** @format */

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li>
      {note.content}
      <button
        onClick={toggleImportance}
        className='rounded-md text-sm p-1 ml-4 border-gray-500 border-2 border-solid bg-slate-100 hover:bg-slate-500 hover:text-white'>
        {label}
      </button>
    </li>
  );
};

export default Note;
