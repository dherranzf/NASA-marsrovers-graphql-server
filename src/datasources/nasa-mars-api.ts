import { RESTDataSource } from "@apollo/datasource-rest";
import { MarsPhotoModel } from "../models";

export class NasaMarsAPI extends RESTDataSource {
  // the API NASA Mars Rover Photos is here
  baseURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";

  // Fetch all Mars photos with optional pagination
  async getMarsPhotos(page: number = 1): Promise<MarsPhotoModel[]> {
    return await this.get<MarsPhotoModel[]>("photos", {
      params: {
        api_key: process.env.NASA_API_KEY, 
        page: page.toString(), 
      },
    });
  }

  // Fetch a specific Mars photo by ID
  async getMarsPhoto(photoId: string): Promise<MarsPhotoModel | undefined> {
    const photos = await this.get<MarsPhotoModel[]>("photos", {
      params: {
        api_key: process.env.NASA_API_KEY 
      },
    });
    return photos.find(photo => photo.id === photoId);
  }

  // Increment the number of views for a specific Mars photo
  async incrementMarsPhotoViews(photoId: string): Promise<MarsPhotoModel> {
    return await this.patch<MarsPhotoModel>(`photos/${photoId}/numberOfViews`, {
      params: {
        api_key: process.env.NASA_API_KEY,
      },
    });
  }
}
