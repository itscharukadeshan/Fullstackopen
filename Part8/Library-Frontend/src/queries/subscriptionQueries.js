/** @format */

import { gql } from "@apollo/client";
import { BOOK_DETAILS } from "./booksQueries";
const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export { BOOK_ADDED };
