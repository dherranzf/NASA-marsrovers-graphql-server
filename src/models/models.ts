export type MarsPhoto = {
  id: string;
  sol: string;
  camera: Camera;
  img_src: string;
  length: number;
  earth_date: string;
  number_of_views: number;
  rover: Rover;
};

export type Camera = {
  id: string;
  name: string;
  rover_id: number;
  full_name: string;
};

export type Rover = {
  id: string;
  name: string;
  landing_date: string; 
  launch_date: string; 
  status: string;      
}
