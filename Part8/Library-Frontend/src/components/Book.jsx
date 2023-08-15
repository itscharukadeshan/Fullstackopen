/** @format */
import React, { useEffect, useState } from "react";

const Book = ({ books }) => {
  const [bookRows, setBookRows] = useState([]);

  useEffect(() => {
    const mappedBooks = books.map((book) => (
      <tr key={book.id}>
        <td>{book.title}</td>
        <td>{book.author.name}</td>
        <td>{book.published}</td>
      </tr>
    ));
    setBookRows(mappedBooks);
  }, [books]);

  return <>{bookRows}</>;
};

export default Book;
