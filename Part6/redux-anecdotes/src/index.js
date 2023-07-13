/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";

import { configureStore } from "@reduxjs/toolkit";
import anecdoteSlice from "./slices/anecdoteSlice";
import filterSlice from "./slices/filterSlice";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteSlice,
    filter: filterSlice,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
