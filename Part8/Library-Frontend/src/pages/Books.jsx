/** @format */
import { useEffect, useState } from "react";
import Book from "../components/Book";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries/booksQueries";

function Books() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (data) {
      const genres = [];

      data.allBooks.forEach((book) => {
        book.genres.forEach((genre) => {
          if (!genres.includes(genre)) {
            genres.push(genre);
          }
        });
      });

      setGenres(genres);
    }
  }, [data]);

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
      <span className='my-8 w-64 flex flex-row item-center flex-wrap'>
        {genres.length > 0 &&
          genres.map((genre) => (
            <button
              className='btn btn-sm btn-outline btn-warning mx-2 my-2'
              key={genre}>
              {genre}
            </button>
          ))}
      </span>
    </main>
  );
}

export default Books;
