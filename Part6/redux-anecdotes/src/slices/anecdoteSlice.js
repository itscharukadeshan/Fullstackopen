/** @format */
import { createSlice } from "@reduxjs/toolkit";
import anecdotesServices from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdote = state.find((a) => a.id === id);
      if (anecdote) {
        anecdote.votes++;
      }
    },

    createAnecdote(state, action) {
      state.push(action.payload);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { voteAnecdote, appendAnecdote, setAnecdotes, sort } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesServices.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesServices.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};
export const addVote = (id) => {
  return async (dispatch) => {
    await anecdotesServices.incrementVote(id);
    dispatch(voteAnecdote(id));
  };
};
export default anecdoteSlice.reducer;
