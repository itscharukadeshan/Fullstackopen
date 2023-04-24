/** @format */

import React from "react";

const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addPerson,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button
          type='submit'
          className=' mt-4 bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-1 px-4 border border-gray-500 hover:border-transparent rounded'>
          Add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
