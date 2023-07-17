/** @format */

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import axios from "axios";

import { getAnecdotes } from "./services/anecdotes";

import { useQuery } from "react-query";

const App = () => {
  const result = useQuery("anecdotes", getAnecdotes);

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    console.log("vote");
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
