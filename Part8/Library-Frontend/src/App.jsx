/** @format */
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Authors from "./pages/Authors";
import AddBook from "./pages/AddBook";
import Books from "./pages/Books";
import NavBar from "./components/NavBar";

import Navigation from "./components/Navigation";

const App = () => {
  return (
    <>
      <Navigation />
      <main className='flex justify-center my-10'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='authors' element={<Authors />} />
          <Route path='books' element={<Books />} />
          <Route path='add-book' element={<AddBook />} />
        </Routes>
      </main>
      <NavBar />
    </>
  );
};

export default App;
