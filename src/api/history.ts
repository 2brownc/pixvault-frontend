import axios from "axios";
import type { ImageId, ImageRecord } from "../types";

export async function setRecentImage(
  userId: string,
  imageRecord: ImageRecord,
  accessToken: string
): Promise<boolean> {
  // URI for setFavoriteImage endpoint on server
  const uri = `${import.meta.env.VITE_SERVER_URL}/images/setRecent`;

  // Request headers with auth token
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "Access-Control-Allow-Origin": "*",
  };

  // Request body with user ID and image record
  const body = {
    userId,
    imageRecord,
  };

  try {
    // Make POST request to set recent image
    const response = await axios.post(uri, body, { headers });

    // Handle 200 response
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    // Log any errors
    console.error(error);
  }

  // Default return value if request fails
  return false;
}

export async function unsetRecentImage(
  userId: string,
  imageRecord: ImageRecord,
  accessToken: string
): Promise<boolean> {
  // URI for setFavoriteImage endpoint on server
  const uri = `${import.meta.env.VITE_SERVER_URL}/images/unsetRecent`;

  // Request headers with auth token
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "Access-Control-Allow-Origin": "*",
  };

  // Request body with user ID and image record
  const body = {
    userId,
    imageRecord,
  };

  try {
    // Make POST request to remove recent image
    const response = await axios.post(uri, body, { headers });

    // Handle 200 response
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    // Log any errors
    console.error(error);
  }

  // Default return value if request fails
  return false;
}

export async function deleteAllRecentImageHistory(
  userId: string,
  accessToken: string
): Promise<boolean> {
  // URI for setFavoriteImage endpoint on server
  const uri = `${import.meta.env.VITE_SERVER_URL}/images/deleteAllRecentHistory`;

  // Request headers with auth token
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "Access-Control-Allow-Origin": "*",
  };

  // Request body with user ID and image record
  const body = {
    userId,
  };

  try {
    // Make POST request to remove all recent image history
    const response = await axios.post(uri, body, { headers });

    // Handle 200 response
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    // Log any errors
    console.error(error);
  }

  // Default return value if request fails
  return false;
}
