/** @format */

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ADD_BOOK } from "../mutations/booksMutations";
import { GET_BOOKS } from "../queries/booksQueries";

const NewBook = () => {
  const navigate = useNavigate();

  const [addBook, { data, loading, error }] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const submit = async (event) => {
    event.preventDefault();

    if (!title || !published || !author || !genres)
      return <>Please fill the all fields</>;

    const { data } = await addBook({
      variables: {
        title,
        author,
        published: Number(published),
        genres: [...genres],
      },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
    navigate("/books");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div className='bg-base-300 py-6 px-8 rounded-box shadow-lg'>
      <h3 className='text-2xl py-6 font-serif font-bold'>Add book</h3>
      <form onSubmit={submit}>
        <div>
          Title
          <input
            className='input input-sm my-2 mx-2'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            className='input input-sm my-2 mx-2'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Published
          <input
            className='input input-sm my-2 mx-2'
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            className='input input-sm my-2 mx-2'
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button
            className='btn btn-outline btn-sm'
            onClick={addGenre}
            type='button'>
            add genre
          </button>
        </div>
        <div>
          Genres
          <div className='genres'>
            {genres.map((genre) => (
              <div
                key={genre}
                className='badge badge-white my-2 mx-1  font-semi-bold badge-outline'>
                {genre}
              </div>
            ))}
          </div>
        </div>
        <button
          className='my-4 btn btn-outline btn-md btn-warning'
          type='submit'>
          create book
        </button>
      </form>
    </div>
  );
};

export default NewBook;
