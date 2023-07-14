/** @format */
import { useEffect } from "react";

import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

import anecdotesService from "./services/anecdotes";
import { setAnecdotes, initializeAnecdotes } from "./slices/anecdoteSlice";

import { useDispatch } from "react-redux";

import "./index.css";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div className='flex flex-col items-center my-6'>
      <h2 className='py-6 text-4xl font-bold'>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
