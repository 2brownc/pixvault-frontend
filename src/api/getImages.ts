import type { AxiosResponse } from "axios";
import type { Image, ImageId } from "../types";
import axios from "axios";
import type { SearchConfig } from "../types";

// This function fetches images from a server based on a search configuration and an access token
export async function getImages(
  uri: string,
  searchConfig: SearchConfig,
  accessToken: string
): Promise<Image[] | null> {
  // Check if the access token is provided
  if (!accessToken) {
    return null;
  }

  // Set the headers for the request
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "Access-Control-Allow-Origin": `${import.meta.env.VITE_SERVER_CROSS_ORIGIN}`,
  };

  try {
    // Send a POST request to the server with the search configuration and headers
    const response: AxiosResponse = await axios.post(uri, searchConfig, {
      headers,
    });
    // Return the response data as an array of Image objects
    return response.data as Image[];
  } catch (error) {
    // If an error occurs, return null
    return null;
  }
}

// This function fetches image information from a server based on a list of image IDs and an access token
export async function getImagesInfo(
  imageIdList: ImageId[],
  accessToken: string
): Promise<Image[] | null> {
  // Set the URI for the request
  const uri = `${import.meta.env.VITE_SERVER_URL}/images/getIdListInfo`;

  // Check if the access token is provided
  if (!accessToken) {
    return null;
  }

  // Set the headers for the request
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "Access-Control-Allow-Origin": `${import.meta.env.VITE_SERVER_CROSS_ORIGIN}`,
  };

  // Set the parameters for the request
  const params = { images: imageIdList };

  try {
    // Send a POST request to the server with the parameters and headers
    const response: AxiosResponse = await axios.post(uri, params, {
      headers,
    });
    // Return the response data as an array of Image objects
    return response.data as Image[];
  } catch (error) {
    // If an error occurs, return null
    return null;
  }
}
