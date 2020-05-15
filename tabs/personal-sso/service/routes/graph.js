const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const path = require("path");
const fs = require("fs");
const express = require("express");
const router = express.Router();

const schema = buildSchema(
  fs.readFileSync(path.join(__dirname, "schema.graphql"), { encoding: "utf-8" })
);

const resolvers = {
  me: (args, request) => {
    return {
      _id: request.user._id,
      email: request.user.email,
      firstname: request.user.firstname,
      lastname: request.user.lastname
    };
  }
};

router.use(
  "*",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
  })
);

module.exports = router;
