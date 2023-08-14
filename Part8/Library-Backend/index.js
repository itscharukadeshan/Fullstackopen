/** @format */

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const mongoose = require("mongoose");
const User = require("./models/user");

const resolvers = require("./resolvers");
const typeDefs = require("./schema");

require("dotenv").config();
const jwt = require("jsonwebtoken");

async function connect() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected!");
}

connect();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(
  server,
  {
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        const decodedToken = jwt.verify(
          auth.substring(7),
          process.env.JWT_SECRET
        );
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      }
    },
  },
  {
    listen: { port: 4000 },
  }
).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
