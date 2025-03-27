import { loadSchemaSync } from '@graphql-tools/load';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { resolvers } from './resolvers';
import path from "path";

const schemaPath = path.resolve(__dirname, "./api-contract/schema.graphqls");

const typeDefs = loadSchemaSync(schemaPath, {
  loaders: [new GraphQLFileLoader()],
});

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export { typeDefs };