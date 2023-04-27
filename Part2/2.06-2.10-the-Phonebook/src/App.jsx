/** @format */
import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import personsService from "./service/persons";
import PersonForm from "./components/PersonForm";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  console.log("render", persons.length, "notes");

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: Math.max(...persons.map((person) => person.id)) + 1,
    };

    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='px-12 py-5 w-full bg-slate-50'>
      <h2 className='text-5xl pt-4'>Phone book</h2>

      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <h3 className='text-3xl pt-4 pb-4'>Add new number</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3 className='text-3xl pt-4'>Numbers</h3>

      <ul>
        {filteredPersons.map((person) => (
          <li className='m-2' key={person.name}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
