import express from "express";
import { ApolloServer } from "apollo-server-express";
import http from "http";
import mongoose, { Connection } from "mongoose";
import typeDefs from "./schemas";
import resolvers from "./resolvers";
import models from "./models";

const PORT = 3000;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models,
  },
});

server.applyMiddleware({ app, corse: true });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const URI = "mongodb://localhost:27017/my-business";

mongoose
  .connect(URI, { useNewUrlParser: true })
  .then(() => {
    console.log("database is connecting");
    httpServer.listen(PORT, () => {
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      );
      console.log(
        `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
      );
    });
  })
  .catch((error) => console.error(error));

// bodyParser is needed just for POST.
// app.use(
//   "/graphql",
//   bodyParser.json(),
//   graphqlExpress({ schema: myGraphQLSchema })
// );

// app.listen(PORT);
