/** @format */

import Notes from "./components/Notes";
import NewNote from "./components/NewNote";
import VisibilityFilter from "./components/VisibilityFilter";
import "./index.css";

const App = () => {
  return (
    <div className='flex flex-col align-baseline items-center my-8 mx-4'>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
