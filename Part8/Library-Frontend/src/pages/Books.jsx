/** @format */

import Book from "../components/Book";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries/booksQueries";

function Books() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error fetching books!</p>;

  return (
    <table>
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
  );
}

export default Books;
