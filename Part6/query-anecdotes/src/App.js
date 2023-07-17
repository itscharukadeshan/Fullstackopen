/** @format */

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, updateAnecdotes } from "./services/anecdotes";
import { useQuery, useMutation, useQueryClient } from "react-query";

const App = () => {
  const queryClient = useQueryClient();

  const result = useQuery("anecdotes", getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const newAnecdoteMutation = useMutation(updateAnecdotes, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }

  if (result.isError) {
    return <div>Error fetching data. Please try again later.</div>;
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
