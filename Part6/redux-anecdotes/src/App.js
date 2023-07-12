/** @format */

import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";

import "./index.css";

const App = () => {
  return (
    <div className='flex flex-col items-center my-6'>
      <h2 className='py-6 text-4xl font-bold'>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
