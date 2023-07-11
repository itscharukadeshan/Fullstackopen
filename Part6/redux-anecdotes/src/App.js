/** @format */

import { useSelector, useDispatch } from "react-redux";
import "./index.css";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch({
      type: "VOTE",
      data: {
        id: id,
      },
    });
  };

  return (
    <div className=' flex flex-col items-center'>
      <div className='flex flex-col items-center my-6'>
        <h2 className='py-6 text-4xl font-bold'>Create new</h2>
        <form>
          <div className='flex flex-row gap-2'>
            <input className='input input-warning input-sm' />
            <button className='btn btn-sm btn-warning btn-outline'>
              create
            </button>
          </div>
        </form>
      </div>
      <h2 className='py-6 text-4xl font-bold'>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div className='w-96 bg-cyan-600 my-4 p-6 rounded-md shadow-lg'>
            <div className='text-xl font-bold text-gray-800'>
              {anecdote.content}
            </div>
            <div className='text-md text-gray-900 my-4'>
              Votes : {anecdote.votes}
              <button
                className='ml-4 btn btn-sm btn-warning btn-outline'
                onClick={() => vote(anecdote.id)}>
                vote
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
