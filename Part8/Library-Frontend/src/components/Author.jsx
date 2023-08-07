/** @format */

const Author = ({ author }) => {
  return (
    <tr>
      <td>{author.name}</td>
      <td>{author.born || "-"}</td>
      <td>{author.bookCount}</td>
    </tr>
  );
};

export default Author;
