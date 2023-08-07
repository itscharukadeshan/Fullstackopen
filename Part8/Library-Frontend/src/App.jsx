/** @format */
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
  const [page, setPage] = useState("authors");

  return (
    <div>
      <div>
        <button
          className='btn btn-outline btn-sm'
          onClick={() => setPage("authors")}>
          authors
        </button>
        <button
          className='btn btn-outline btn-sm'
          onClick={() => setPage("books")}>
          books
        </button>
        <button
          className='btn btn-outline btn-sm'
          onClick={() => setPage("add")}>
          add book
        </button>
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
