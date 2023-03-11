/** @format */
const Anecdote = ({ anecdote, votes, handleVoteClick }) => {
  return (
    <div>
      <div>{anecdote}</div>
      <div>
        has {votes} votes
        <button onClick={handleVoteClick}>vote</button>
      </div>
    </div>
  );
};

export default Anecdote;
