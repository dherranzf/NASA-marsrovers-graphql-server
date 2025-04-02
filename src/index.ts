import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers/resolvers";
import { NasaMarsAPI } from "./datasources/nasa-mars-api";
import 'dotenv/config'; // Carga automáticamente las variables de entorno desde el archivo .env

async function startApolloServer() {
  require('dotenv').config();
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      const { cache } = server;
      return {
        dataSources: {
          marsAPI: new NasaMarsAPI({ cache }),
        },
      };
    },
  });
  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

startApolloServer();
