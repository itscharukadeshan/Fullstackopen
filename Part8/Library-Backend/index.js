/** @format */

const { ApolloServer } = require("@apollo/server");
const { GraphQLError } = require("graphql");

const { startStandaloneServer } = require("@apollo/server/standalone");

const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

require("dotenv").config();
const jwt = require("jsonwebtoken");

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
type User {
  username: String!
  id: ID!
}
type Token {
  value: String!
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

const resolvers = {
  Author: {
    bookCount: async (parent) => {
      return await Book.countDocuments({ author: parent.id });
    },
  },

  Query: {
    bookCount: async () => {
      return await Book.countDocuments();
    },

    allBooks: async (parent, args) => {
      const filter = {};

      if (args.genre) filter.genres = args.genre;
      if (args.author) filter.author = args.author;

      return Book.find(filter).populate("author").populate("genres");
    },

    allAuthors: async () => {
      return await Author.find();
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
    genres: async () => {
      const books = await Book.find();

      const genres = [];
      books.forEach((book) => {
        book.genres.forEach((genre) => {
          if (!genres.includes(genre)) {
            genres.push(genre);
          }
        });
      });

      return genres;
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
        await newBook.populate("author");

        return newBook;
      } catch (error) {
        if (error.code === 11000) {
          throw new GraphQLError("Book already exists", {
            originalError: error,
          });
        } else {
          throw new GraphQLError("Error adding book", { originalError: error });
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
          throw new GraphQLError("Author not found", { originalError: error });
        } else {
          throw new GraphQLError("Error updating author", {
            originalError: error,
          });
        }
      }
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      });
    },
    login: async (_, args, context) => {
      const user = await User.findOne({ username: args.username });

      if (!user) {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      context.user = user;

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
