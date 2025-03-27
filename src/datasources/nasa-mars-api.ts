import { RESTDataSource, AugmentedRequest } from "@apollo/datasource-rest";
import { MarsPhotoModel } from "../models";

export class NasaMarsAPI extends RESTDataSource {
  // the API NASA Mars Rover Photos is here
  baseURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";

  // Add the API key to all requests automatically and log the request
  willSendRequest(path: string, requestOpts: AugmentedRequest) {
    if (!requestOpts.params) {
      requestOpts.params = new URLSearchParams();
    }
    requestOpts.params.set("api_key", process.env.NASA_API_KEY!); // Automatically include the API key

    // Log the request details for debugging
    console.log("Request Path:", path);
    console.log("Request Params:", requestOpts.params.toString());
  }

  // Fetch all Mars photos with optional pagination
  async getMarsPhotos(page: number = 1): Promise<MarsPhotoModel[]> {
    return await this.get<MarsPhotoModel[]>("photos", {
      params: {
        page: page.toString(), // Only include the page parameter here
      },
    });
  }

  // Fetch a specific Mars photo by ID with optional pagination
  async getMarsPhoto(photoId: string, page: number = 1): Promise<MarsPhotoModel | undefined> {
    const photos = await this.get<MarsPhotoModel[]>("photos");
    return photos.find(photo => photo.id === photoId);
  }

  // Increment the number of views for a specific Mars photo
  async incrementMarsPhotoViews(photoId: string): Promise<MarsPhotoModel> {
    return await this.patch<MarsPhotoModel>(`photos/${photoId}/numberOfViews`);
  }
}
