/** @format */
import { gql } from "@apollo/client";

const ADD_AUTHOR_YEAR = gql`
  mutation ($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
    }
  }
`;

export { ADD_AUTHOR_YEAR };
