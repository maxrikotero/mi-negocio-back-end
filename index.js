import express from "express";
import { ApolloServer } from "apollo-server-express";
import http from "http";
import typeDefs from "./schemas";
import resolvers from "./resolvers";

const PORT = 3000;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app, corse: true });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
  );
});

// bodyParser is needed just for POST.
// app.use(
//   "/graphql",
//   bodyParser.json(),
//   graphqlExpress({ schema: myGraphQLSchema })
// );

// app.listen(PORT);
