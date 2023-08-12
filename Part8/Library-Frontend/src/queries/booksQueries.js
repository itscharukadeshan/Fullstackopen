/** @format */
import { gql } from "@apollo/client";

const GET_BOOKS = gql`
  query ($genre: String!) {
    allBooks(genre: $genre) {
      title
      author {
        name
        id
      }
      published
      genres
      id
    }
  }
`;
const GET_ALL_GENRES = gql`
  query {
    genres
  }
`;

export { GET_BOOKS, GET_ALL_GENRES };
