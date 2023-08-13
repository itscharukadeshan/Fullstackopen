/** @format */
import { gql } from "@apollo/client";

const GET_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;

export { GET_USER };
