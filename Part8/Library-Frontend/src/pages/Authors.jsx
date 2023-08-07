/** @format */
import Author from "../components/Author";
import AddAgeForm from "../components/AddAgeForm";
import { useQuery } from "@apollo/client";
import { GET_AUTHORS } from "../queries/authorsQueries";

function Authors() {
  const { loading, data, error } = useQuery(GET_AUTHORS);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error fetching books!</p>;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {data.allAuthors.map((author) => (
            <Author key={author.id} author={author} />
          ))}
        </tbody>
      </table>
      <AddAgeForm />
    </>
  );
}

export default Authors;
