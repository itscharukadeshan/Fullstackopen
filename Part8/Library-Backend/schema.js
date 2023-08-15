/** @format */

const typeDefs = `

type Book {
  title: String!
  published: Int
  author: Author!
  genres: [String!]!
  id: ID! 
}
type Author {
  name:String!
  born:Int
  bookCount:Int!
  id:ID!

}
type User {
  username: String!
  id: ID!
  favoriteGenre: String!
}
type Token {
  value: String!
}
type Subscription {
  bookAdded: Book!
}    


  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(genre: String , author:String):[Book!]!
    allAuthors:[Author!]!
    genres: [String!]! 
    me: User


  }
  type Mutation {
  addBook(
    title: String!
    author:String!
    published: Int!
    genres: [String!]!
  ): Book

  createUser(
    username: String!
    favoriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token


  editAuthor(name: String!, setBornTo: Int!): Author 

}
`;

module.exports = typeDefs;
