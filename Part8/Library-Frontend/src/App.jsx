/** @format */
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSubscription } from "@apollo/client";
import { BOOK_ADDED } from "./queries/subscriptionQueries.js";

import Home from "./pages/Home";
import Authors from "./pages/Authors";
import AddBook from "./pages/AddBook";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Recommendations from "./pages/Recommendations";

import Navigation from "./components/Navigation";

const App = () => {
  const [token, setToken] = useState(null);
  const [newBook, setNewBook] = useState(null);

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      setNewBook(data.data.bookAdded);
    },
  });

  useEffect(() => {
    if (newBook) {
      const timeout = setTimeout(() => {
        window.alert(`New Book ${newBook.title} added`);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [newBook]);

  useEffect(() => {
    const storedToken = localStorage.getItem("user-token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div>
      <Navigation token={token} setToken={setToken} />
      <main className='flex justify-center flex-grow my-10'>
        <Routes>
          <Route path='/' element={<Home token={token} />} />
          <Route path='authors' element={<Authors />} />
          <Route path='books' element={<Books newBook={newBook} />} />
          <Route path='add-book' element={<AddBook />} />
          <Route path='login' element={<Login setToken={setToken} />} />
          <Route path='recommendation' element={<Recommendations />} />
          <Route path='*' element={<Home token={token} />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
