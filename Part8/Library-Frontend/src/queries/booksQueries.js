/** @format */
import { gql } from "@apollo/client";

const GET_BOOKS = gql`
  query {
    allBooks {
      title
      Author {
        name
      }
      published
      genres
      id
    }
  }
`;

export { GET_BOOKS };
