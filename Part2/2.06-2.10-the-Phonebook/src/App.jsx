/** @format */
import React from "react";
import { useState } from "react";

import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState();

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const existingPerson = persons.find((person) => person.name === newName);

  if (existingPerson) {
    alert(`${newName} is already added to the phonebook`);
  } else {
    const addPerson = (e) => {
      e.preventDefault();
      const newPerson = {
        name: newName,
        number: newNumber,
        id: Math.max(...persons.map((person) => person.id)) + 1,
      };
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    };

    let filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(searchTerm)
    );

    return (
      <div className='p-5'>
        <h2 className='text-5xl pb-4'>Phonebook</h2>
        <div>
          Search :
          <input
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder=' Search for a name...'
            className='text-lg'
          />
        </div>
        <h3 className='text-4xl pt-5 pb-4'>Add new name</h3>
        <form onSubmit={addPerson}>
          <div className='text-xl'>
            Full Name : <input value={newName} onChange={handleNameChange} />
          </div>
          <div className='text-xl'>
            Number : <input value={newNumber} onChange={handleNumberChange} />
          </div>
          <div>
            <button
              className='pl-3 pr-3 pt-1  pb-1 mt-5 rounded-md bg-black text-white hover:bg-white hover:text-black hover:border-black hover:border-solid hover:border-2'
              type='submit'>
              add
            </button>
          </div>
        </form>
        <div>
          <h3 className='text-4xl pb-4 pt-5'>Numbers</h3>
          {filteredPersons.map((person) => (
            <li className=' list-none text-lg mt-2' key={person.name}>
              {person.name} {person.number}
            </li>
          ))}
        </div>
      </div>
    );
  }
};

export default App;
