/** @format */
import { useEffect } from "react";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";
import { useDispatch } from "react-redux";
import { initializeNotes } from "./reducers/noteReducer";

import "./index.css";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);

  return (
    <div className='flex flex-col align-baseline items-center my-8 mx-4'>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
