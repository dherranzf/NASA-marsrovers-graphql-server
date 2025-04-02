import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers/resolvers";
import { NasaMarsAPI } from "./datasources/nasa-mars-api";
import 'dotenv/config'; // Automatically loads environment variables from the .env file

async function startApolloServer() {
  require('dotenv').config();
  const server = new ApolloServer({ typeDefs, resolvers });
  const port = Number(process.env.PORT) || 4000; // Convert the port to a number or default to 4000
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      const { cache } = server;
      return {
        dataSources: {
          marsAPI: new NasaMarsAPI({ cache }),
        },
      };
    },
    listen: { port },
  });
  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

startApolloServer();
