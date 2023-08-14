/** @format */

import { useEffect } from "react";

import { useQuery } from "@apollo/client";
import { GET_USER } from "../queries/userQueries";
import { GET_BOOKS } from "../queries/booksQueries";
import Book from "../components/Book";

function Recommendations() {
  const result = useQuery(GET_USER);

  const genre = result.data?.me.favoriteGenre;

  const {
    loading: booksLoading,
    error: booksError,
    data: booksData,
  } = useQuery(GET_BOOKS, {
    variables: { genre },
    skip: !genre,
  });

  if (result.loading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <span className='loading'></span>
      </div>
    );
  }

  if (result.error) return <p>Error fetching books!</p>;

  return (
    <main className='flex flex-col gap-3'>
      <h2 className='text-4xl font-bold'>Recommendation</h2>
      <div className='flex flex-row gap-4 item-center my-4'>
        book in your favorite genre{" "}
        <span className='badge badge-outline font-mono mt-1'>
          {result.data.me.favoriteGenre}
        </span>
      </div>
      <table className='table w-fit'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {booksData
            ? booksData.allBooks.map((book) => (
                <Book key={book.id} book={book} />
              ))
            : null}
        </tbody>
      </table>
    </main>
  );
}

export default Recommendations;
