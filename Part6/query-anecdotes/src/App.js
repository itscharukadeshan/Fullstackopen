/** @format */
import React, { useContext } from "react";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, updateAnecdotes } from "./services/anecdotes";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { NotificationContext } from "./services/NotificationContext";

const App = () => {
  const { notification, setNotification, clearNotification } =
    useContext(NotificationContext);
  const queryClient = useQueryClient();

  const result = useQuery("anecdotes", getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const newAnecdoteMutation = useMutation(updateAnecdotes, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
      setNotification("Vote submitted!");
    },
  });

  if (result.isLoading) {
    return (
      <div className='flex flex-row items-center gap-6 p-4 w-96'>
        Loading data
        <span className='loading loading-bars loading-sm'></span>
      </div>
    );
  }

  if (result.isError) {
    return (
      <div className='py-4 w-96'>
        <div className='alert'>
          <span>Error fetching data. Please try again later</span>
        </div>
      </div>
    );
  }

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    newAnecdoteMutation.mutate(updatedAnecdote);
  };

  return (
    <div className='m-8 '>
      <h1 className='text-4xl font-sans font-extrabold my-8'>Anecdote app</h1>
      <div className='flex flex-col items-center'>
        <Notification
          message={notification}
          clearNotification={clearNotification}
        />
        <AnecdoteForm />

        {anecdotes.map((anecdote) => (
          <div
            className=' bg-slate-500 my-4 p-8 rounded-lg text-slate-900 text-xl font-bold font-mono w-96 shadow-lg border-slate-600 border-spacing-2 border-2'
            key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div className='flex flex-row items-center my-4'>
              <div>Votes : {anecdote.votes}</div>
              <button
                className='btn btn-sm btn-outline mx-4 btn-warning'
                onClick={() => handleVote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
