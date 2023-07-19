/** @format */

import { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };
  const restInput = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    restInput,
  };
};

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setResources(response.data);
    });
  }, [baseUrl]);

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    setResources((prev) => [...prev, response.data]);
    return response.data;
  };

  return [resources, { create }];
};

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");
  const baseUrl = "http://localhost:3005";

  const [notes, noteService] = useResource(`${baseUrl}/notes`);
  const [persons, personService] = useResource(`${baseUrl}/persons`);

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
    content.restInput();
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
    name.restInput();
    number.restInput();
  };

  return (
    <div>
      <h2 className='font:40 font:bold m:50 text:center'>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2 className='font:40 font:bold m:50 text:center'>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
