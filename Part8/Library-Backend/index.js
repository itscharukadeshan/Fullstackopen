/** @format */

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");

require("dotenv").config();

async function connect() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected!");
}

connect();

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

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(genre: String , author:String):[Book!]!
    allAuthors:[Author!]!

  }
  type Mutation {
  addBook(
    title: String!
    author:String!
    published: Int!
    genres: [String!]!
  ): Book

  editAuthor(name: String!, setBornTo: Int!): Author 

}
`;

const resolvers = {
  Query: {
    bookCount: async () => {
      return await Book.countDocuments();
    },

    allBooks: async (parent, args) => {
      const filter = {};

      if (args.genre) filter.genres = args.genre;
      if (args.author) filter.author = args.author;

      return await Book.find(filter);
    },

    allAuthors: async () => {
      return await Author.find();
    },
  },

  Mutation: {
    addBook: async (parent, args) => {
      try {
        let author = await Author.findOne({ name: args.author });

        if (!author) {
          author = new Author({ name: args.author });
          await author.save();
        }

        const newBook = new Book({ ...args, author: author._id });
        await newBook.save();
        return newBook;
      } catch (error) {
        if (error.code === 11000) {
          throw new GraphQLError("Book already exists");
        } else {
          throw new GraphQLError("Error adding book");
        }
      }
    },

    editAuthor: async (parent, args) => {
      try {
        const { name, setBornTo } = args;

        const author = await Author.findOne({ name });

        author.born = setBornTo;
        await author.save();

        return author;
      } catch (error) {
        if (error.kind === "ObjectId") {
          throw new GraphQLError("Author not found");
        } else {
          throw new GraphQLError("Error updating author");
        }
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
