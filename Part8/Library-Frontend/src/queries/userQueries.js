/** @format */
import { gql } from "@apollo/client";

const GET_USER = gql`
  query {
    me {
      _id
      username
      favoriteGenre
    }
  }
`;

export { GET_USER };
