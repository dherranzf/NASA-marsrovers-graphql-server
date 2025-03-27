import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: "./src/api-contract/schema.graphqls",
  generates: {
    "./src/types.ts": {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: "./context#DataSourceContext",
        mappers: {
          MarsPhoto: "./models#MarsPhotoModel"
        },
      }
    },
  },
};

export default config;