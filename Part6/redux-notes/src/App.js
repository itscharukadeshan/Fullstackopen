/** @format */

import NewNote from "./components/NewNote";
import Notes from "./components/Notes";

import "./index.css";

const App = () => {
  return (
    <div className='m-8 pt-6'>
      <NewNote />
      <Notes />
    </div>
  );
};

export default App;
