/** @format */
import { useState } from "react";
import { ADD_AUTHOR_YEAR } from "../mutations/authorsMutations";
import { GET_AUTHORS } from "../queries/authorsQueries";
import { useMutation } from "@apollo/client";

function AddYearForm({ authors }) {
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState(0);

  const [addYear, { data, loading, error }] = useMutation(ADD_AUTHOR_YEAR, {
    refetchQueries: [{ query: GET_AUTHORS }],
  });

  const handleSelection = (e) => {
    setAuthor(e.target.value);
  };

  const handleInput = (e) => {
    setYear(Number(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await addYear({
      variables: {
        name: author,
        setBornTo: year,
      },
    });
  };

  return (
    <div className='bg-base-300 p-8 rounded-box my-16 shadow-lg'>
      <h2 className='my-6 text-xl font-bold font-mono'>
        Add Authors born year
      </h2>
      <form onSubmit={handleSubmit} className='flex flex-col items-start gap-4'>
        <select>
          <option value=''>Select an author</option>

          {authors.map((author) => (
            <option
              onClick={handleSelection}
              key={author.id}
              value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <input onChange={handleInput} type='number' />
        <button type='submit' className='btn btn-sm btn-warning btn-outline'>
          Add born Year
        </button>
      </form>
    </div>
  );
}

export default AddYearForm;
