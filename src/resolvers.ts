import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    // returns an array of MarsPhoto that will be used to populate the homepage grid of our clients
    marsPhotos: async (_, __, { dataSources }) => {
      return await dataSources.marsAPI.getMarsPhotos();
    },

    // get a single photo by ID, for the track page
    marsPhoto: async (_, { id }, { dataSources }) => {
      return await dataSources.marsAPI.getMarsPhoto(id);
    }
  },
  Mutation: {
    // increments a photos's numberOfViews property
    incrementMarsPhotoViews: async (_, { id }, { dataSources }) => {
      try {
        const track = await dataSources.marsAPI.incrementMarsPhotoViews(id);
        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for photo ${id}`,
          track,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null,
        };
      }
    },
  }
};
