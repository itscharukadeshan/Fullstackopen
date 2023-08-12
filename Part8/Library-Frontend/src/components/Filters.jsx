/** @format */

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_GENRES } from "../queries/booksQueries";

function Filters({ setGenre, setActiveGenre, activeGenre }) {
  const { loading, error, data } = useQuery(GET_ALL_GENRES);

  const [genres, setGenres] = useState([]);

  const handleClick = (genre) => {
    setGenre(genre);
    setActiveGenre(genre);
  };

  useEffect(() => {
    if (data) {
      setGenres(data.genres.filter((genre) => genre !== ""));
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <span className='my-8 w-64 flex flex-row item-center flex-wrap'>
      {genres.length > 0 &&
        genres.map((genre) => (
          <button
            onClick={() => handleClick(genre)}
            className={`btn btn-sm btn-outline btn-warning lowercase mx-2 my-2 
            ${genre === activeGenre ? "btn-active" : ""}`}
            key={genre}>
            {genre}
          </button>
        ))}
    </span>
  );
}

export default Filters;
