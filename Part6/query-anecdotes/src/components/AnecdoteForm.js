/** @format */

import React, { useContext } from "react";

import { useMutation, useQueryClient } from "react-query";
import { createAnecdotes } from "../services/anecdotes";
import { NotificationContext } from "../services/NotificationContext";

const AnecdoteForm = () => {
  const { setNotification } = useContext(NotificationContext);
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(createAnecdotes, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    console.log(content);
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
    if (content.length <= 5) {
      setNotification("Anecdote must be more than 5 letters.");
    } else {
      newAnecdoteMutation.mutate({ content, votes: 0 });
      setNotification(`${content} Added!`);
    }
  };

  return (
    <div className='my-8 flex flex-col items-start'>
      <h2 className='text-xl font-bold my-2 uppercase'>create new</h2>
      <form className='flex flex-row items-center' onSubmit={onCreate}>
        <input
          name='anecdote'
          type='text'
          placeholder='Create anecdotes'
          className='input input-bordered input-md w-full max-w-xs'
        />
        <button className='my-2 mx-2 btn btn-md btn-outline ' type='submit'>
          create
        </button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
