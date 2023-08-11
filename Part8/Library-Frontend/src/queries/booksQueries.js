/** @format */
import { gql } from "@apollo/client";

const GET_BOOKS = gql`
  query {
    allBooks {
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

export { GET_BOOKS };
