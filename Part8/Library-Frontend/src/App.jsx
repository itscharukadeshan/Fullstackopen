/** @format */
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Authors from "./pages/Authors";
import AddBook from "./pages/AddBook";
import Books from "./pages/Books";
import Login from "./pages/Login";

import Navigation from "./components/Navigation";

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <div>
      <Navigation />
      <main className='flex justify-center flex-grow my-10'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='authors' element={<Authors />} />
          <Route path='books' element={<Books />} />
          <Route path='add-book' element={<AddBook />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
