/** @format */

import { useQuery } from "@apollo/client";
import { GET_USER } from "../queries/userQueries";

function Recommendations({ token }) {
  const { loading, data, error } = useQuery(GET_USER, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });

  if (loading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <span className='loading'></span>
      </div>
    );
  }

  if (error) return <p>Error fetching books!</p>;

  console.log(data);
}

export default Recommendations;
