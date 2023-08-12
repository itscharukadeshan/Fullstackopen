/** @format */
import { gql } from "@apollo/client";

const GET_USER = gql`
  query {
    me {
      id
    }
  }
`;

export { GET_USER };
