/** @format */

const Book = ({ books }) => {
  return (
    <>
      {books.map((book) => (
        <tr key={book.id}>
          <td>{book.title}</td>
          <td>{book.author.name}</td>
          <td>{book.published}</td>
        </tr>
      ))}
    </>
  );
};

export default Book;
