import { RESTDataSource } from "@apollo/datasource-rest";
import { MarsPhotoModel } from "../models"

export class NasaMarsAPI extends RESTDataSource {
  // the API NASA Mars Rover Photos is here
  baseURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";
  
  getMarsPhotos() {
    return this.get<MarsPhotoModel[]>("photos");
  }

  getMarsPhoto(photoId: string) {
    const photos = this.get<MarsPhotoModel[]>("photos");
    return photos.find(photo => photo.id === photoId);
  }

  incrementMarsPhotoViews(photoId: string) {
    return this.patch<MarsPhotoModel>(`photos/${photoId}/numberOfViews`);
  }
}
