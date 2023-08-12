/** @format */
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Authors from "./pages/Authors";
import AddBook from "./pages/AddBook";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Recommendations from "./pages/Recommendations";

import Navigation from "./components/Navigation";

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <div>
      <Navigation token={token} setToken={setToken} />
      <main className='flex justify-center flex-grow my-10'>
        <Routes>
          <Route path='/' element={<Home token={token} />} />
          <Route path='authors' element={<Authors />} />
          <Route path='books' element={<Books />} />
          <Route path='add-book' element={<AddBook />} />
          <Route path='login' element={<Login setToken={setToken} />} />
          <Route
            path='recommendation'
            element={<Recommendations token={token} />}
          />
          <Route path='*' element={<Home token={token} />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
