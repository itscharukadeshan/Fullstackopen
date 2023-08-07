/** @format */
import { gql } from "@apollo/client";

const GET_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

export { GET_AUTHORS };
