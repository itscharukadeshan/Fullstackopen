/** @format */

import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../slices/anecdoteSlice";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(addVote(id));
  };

  return (
    <div className='flex flex-col items-center my-6'>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <div className='w-96 bg-cyan-600 my-4 p-6 rounded-md shadow-lg'>
              <div className='text-xl font-bold text-gray-800'>
                {anecdote.content}
              </div>
              <div className='text-md text-gray-900 my-4'>
                Votes: {anecdote.votes}
                <button
                  className='ml-4 btn btn-sm btn-warning btn-outline'
                  onClick={() => vote(anecdote.id)}>
                  vote
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnecdoteList;
