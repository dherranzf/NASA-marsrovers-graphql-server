import { RESTDataSource, AugmentedRequest } from "@apollo/datasource-rest";
import { MarsPhoto } from "../models/models";

export class NasaMarsAPI extends RESTDataSource {
  // The API NASA Mars Rover Photos is here
  baseURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";

  // Add the API key to all requests automatically and log the request
  willSendRequest(path: string, requestOpts: AugmentedRequest) {
    if (!requestOpts.params) {
      requestOpts.params = new URLSearchParams();
    }
    requestOpts.params.set("api_key", process.env.NASA_API_KEY!); // Automatically include the API key

    // Add earth_date
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 2);
    const earthDate = yesterday.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    requestOpts.params.set("earth_date", earthDate);

    // Log the request details for debugging
    console.log("Request Path:", path);
    console.log("Request Params:", requestOpts.params.toString());
  }

  // Fetch all Mars photos with optional pagination
  async getMarsPhotos(page: number = 1): Promise<MarsPhoto[]> {
    const response = await this.get<{ photos: MarsPhoto[] }>("photos", {
      params: {
        page: page.toString(),
      },
    });
    console.log("Response:", response);
    return response.photos;
  }

  // Fetch a specific Mars photo by ID
  async getMarsPhoto(photoId: string): Promise<MarsPhoto | undefined> {
    console.log("Request photoId:", photoId);
    const response = await this.get<{ photos: MarsPhoto[] }>("photos");
    console.log("Response:", response);
    const photo = response.photos.find(photo => photo.id.toString() === photoId);
    console.log("Result photo:", photo);
    return photo;
  }

  // Increment the number of views for a specific Mars photo
  async incrementMarsPhotoViews(photoId: string): Promise<MarsPhoto> {
    return await this.patch<MarsPhoto>(`photos/${photoId}/numberOfViews`);
  }
}
