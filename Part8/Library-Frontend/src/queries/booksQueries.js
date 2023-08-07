/** @format */
import { gql } from "@apollo/client";

const GET_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
      genres
    }
  }
`;

export { GET_BOOKS };
