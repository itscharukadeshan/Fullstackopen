/** @format */

import { useQuery } from "@apollo/client";
import { GET_USER } from "../queries/userQueries";

function Recommendations() {
  const result = useQuery(GET_USER);

  if (result.loading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <span className='loading'></span>
      </div>
    );
  }

  if (result.error) return <p>Error fetching books!</p>;

  console.log(result.data);
}

export default Recommendations;
