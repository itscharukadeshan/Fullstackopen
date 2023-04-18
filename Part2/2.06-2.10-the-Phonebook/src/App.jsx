/** @format */

import { useState } from "react";
import NameList from "./components/NameList";
import HandleData from "./components/HandleData";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type='submit' onClick={HandleData}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <NameList />
    </div>
  );
};

export default App;
