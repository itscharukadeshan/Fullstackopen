/** @format */

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");

const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");

require("dotenv").config();

async function connect() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected!");
}

connect();

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

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
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        await author.save();
      }

      const newBook = new Book({ ...args, author: author._id });
      await newBook.save();
      return newBook;
    },

    editAuthor: async (parent, args) => {
      const { name, setBornTo } = args;
      const author = await Author.findOne({ name });
      if (!author) throw "Author not found";

      author.born = setBornTo;
      await author.save();
      return author;
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
