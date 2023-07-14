/** @format */

import { configureStore } from "@reduxjs/toolkit";

import filterSlice from "./slices/filterSlice";
import anecdoteSlice, { setAnecdotes } from "./slices/anecdoteSlice";
import notificationSlice from "./slices/notificationSlice";

import anecdotesService from "./services/anecdotes";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteSlice,
    filter: filterSlice,
    notifications: notificationSlice,
  },
});

anecdotesService
  .getAll()
  .then((anecdotes) => store.dispatch(setAnecdotes(anecdotes)));

export default store;
