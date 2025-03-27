import { NasaMarsAPI } from "./datasources/nasa-mars-api";

export type DataSourceContext = {
  dataSources: {
    marsAPI: NasaMarsAPI;
  };
}
