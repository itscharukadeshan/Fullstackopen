/** @format */

const Book = ({ book }) => {
  return (
    <tr>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.published}</td>
    </tr>
  );
};

export default Book;
