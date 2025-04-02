import { Resolvers } from "../types";

export const resolvers: Resolvers = {
  Query: {
    // returns an array of MarsPhoto that will be used to populate the homepage grid of our clients
    marsPhotos: async (_, { sol, earth_date }, { dataSources }) => {
      return await dataSources.marsAPI.getMarsPhotos(1, sol, earth_date);
    },

    // get a single photo by ID, for the marsPhoto page
    marsPhoto: async (_, { id, sol }, { dataSources }) => {
      return await dataSources.marsAPI.getMarsPhoto(id, sol);
    }
  },
  Mutation: {
    // increments a photos's numberOfViews property
    incrementMarsPhotoViews: async (_, { id }, { dataSources }) => {
      try {
        const marsPhoto = await dataSources.marsAPI.incrementMarsPhotoViews(id);
        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for photo ${id}`,
          marsPhoto,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          marsPhoto: null,
        };
      }
    },
  }
};
