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

  return (
    <main className='flex flex-col gap-3'>
      <h2 className='text-xl font-bold'>Recommendation</h2>
      <div>book in your favorite genre {result.data.me.favoriteGenre}</div>
    </main>
  );

  console.log(result.data);
}

export default Recommendations;
