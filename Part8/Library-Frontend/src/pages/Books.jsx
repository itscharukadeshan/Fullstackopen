/** @format */
import { useState } from "react";

import Book from "../components/Book";
import Filters from "../components/Filters";

import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries/booksQueries";

function Books() {
  const [genre, setGenre] = useState("");

  const { loading, error, data } = useQuery(GET_BOOKS, {
    variables: { genre },
  });

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
      <h3 className='mt-16 text-2xl font-mono'>Filter book</h3>
      <Filters setGenre={setGenre} />
    </main>
  );
}

export default Books;
