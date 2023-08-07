/** @format */
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Authors from "./pages/Authors";
import AddBook from "./pages/AddBook";
import Books from "./pages/Books";

import Navigation from "./components/Navigation";

const App = () => {
  return (
    <>
      <Navigation />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='authors' element={<Authors />} />
        <Route path='books' element={<Books />} />
        <Route path='add-book' element={<AddBook />} />
      </Routes>
    </>
  );
};

export default App;
