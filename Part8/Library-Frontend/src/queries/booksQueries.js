/** @format */
import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
  fragment bookDetails on Book {
    title
    author {
      name
      id
    }
    published
    genres
    id
  }
`;

const GET_BOOKS = gql`
  query ($genre: String!) {
    allBooks(genre: $genre) {
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`;
const GET_ALL_GENRES = gql`
  query {
    genres
  }
`;

export { GET_BOOKS, GET_ALL_GENRES, BOOK_DETAILS };
