/** @format */

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, updateAnecdotes } from "./services/anecdotes";

import { useQuery, useMutation, useQueryClient } from "react-query";

const App = () => {
  const result = useQuery("anecdotes", getAnecdotes, {
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(updateAnecdotes, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
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
