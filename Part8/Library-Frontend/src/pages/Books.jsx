/** @format */
import { useState, useEffect } from "react";

import Book from "../components/Book";
import Filters from "../components/Filters";

import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries/booksQueries";

function Books() {
  const [genre, setGenre] = useState("");
  const [activeGenre, setActiveGenre] = useState(null);

  const { loading, error, data, refetch } = useQuery(GET_BOOKS, {
    variables: { genre },
  });

  const handleClear = () => {
    setGenre("");
    setActiveGenre("");
  };

  useEffect(() => {
    refetch();
  }, [genre]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <span className='loading'></span>
      </div>
    );
  }

  if (error) return <p>Error fetching books!</p>;

  return (
    <main className='flex flex-col'>
      <table className='table w-fit'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {data.allBooks.map((book) => (
            <Book key={book.id} book={book} />
          ))}
        </tbody>
      </table>
      <div className='flex flex-col gap-4'>
        <h3 className='mt-16 text-2xl font-mono'>Filter book</h3>
        <button onClick={handleClear} className='btn btn-sm btn-outline w-fit'>
          Clear all
        </button>
      </div>

      <Filters
        setGenre={setGenre}
        setActiveGenre={setActiveGenre}
        activeGenre={activeGenre}
      />
    </main>
  );
}

export default Books;
