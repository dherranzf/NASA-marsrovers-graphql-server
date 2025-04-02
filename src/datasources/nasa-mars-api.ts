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

    // Add default earth_date only if not already provided
    if (!requestOpts.params.has("earth_date") && !requestOpts.params.has("sol")) {
      requestOpts.params.set("sol", "1"); // Default to sol 1 if neither earth_date nor sol is provided
    } 

    // Log the request details for debugging
    console.debug("Request Path:", path);
    console.debug("Request Params:", requestOpts.params.toString());
  }

  // Fetch all Mars photos with optional pagination and filters
  async getMarsPhotos(page: number = 1, sol?: string, earth_date?: string): Promise<MarsPhoto[]> {
    const params: Record<string, string> = { page: page.toString() };
    if (sol) params.sol = sol;
    if (earth_date) params.earth_date = earth_date;

    const response = await this.get<{ photos: MarsPhoto[] }>("photos", {
      params,
      cacheOptions: { ttl: 60 }, // Cache for 60 seconds
    });
    return response.photos;
  }

  // Fetch a specific Mars photo by ID with optional sol filter
  async getMarsPhoto(photoId: string, sol?: string): Promise<MarsPhoto | undefined> {
    const params: Record<string, string> = {};
    if (sol) params.sol = sol;

    console.debug("Request photoId:", photoId, "Sol:", sol);
    const response = await this.get<{ photos: MarsPhoto[] }>("photos", { params });
    console.debug("Response:", response);

    const photo = response.photos.find(photo => photo.id.toString() === photoId);
    console.debug("Result photo:", photo);
    return photo;
  }

  // Increment the number of views for a specific Mars photo
  async incrementMarsPhotoViews(photoId: string): Promise<MarsPhoto> {
    return await this.patch<MarsPhoto>(`photos/${photoId}/numberOfViews`);
  }
}
