/** @format */

import { useDispatch } from "react-redux";
import { createAnecdote } from "../slices/anecdoteSlice";

import anecdotesServices from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleCreateAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.newAnecdote.value;
    const newNote = await anecdotesServices.createNew(content);
    dispatch(createAnecdote(newNote));
  };

  return (
    <div className='flex flex-col items-center my-6'>
      <h2 className='py-6 text-4xl font-bold'>Create new</h2>

      <form onSubmit={handleCreateAnecdote}>
        <div className='flex flex-row gap-2'>
          <input name='newAnecdote' className='input input-warning input-sm' />

          <button type='submit' className='btn btn-sm btn-warning btn-outline'>
            create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnecdoteForm;
