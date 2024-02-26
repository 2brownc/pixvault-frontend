// import axios from 'axios';

import axios from "axios" // axios used for making API requests
import type { ImageId, ImageRecord } from "../types"

export async function setFavorite(
  userId: string,
  imageRecord: ImageRecord,
  accessToken: string,
) {
  // URI for setFavoriteImage endpoint on server
  const uri = `${import.meta.env.VITE_SERVER_URL}/setFavoriteImage`

  // Request headers with auth token
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "Access-Control-Allow-Origin": "*",
  }

  // Request body with user ID and image record
  const body = {
    userId,
    imageRecord,
  }

  console.log("setFavoriteImage body:", { body })

  try {
    // Make POST request to set favorite image
    const response = await axios.post(uri, body, { headers })

    // Handle 200 response
    if (response.status === 200) {
      return true
    }
  } catch (error) {
    // Log any errors
    console.log("Error setting favorite image:", error)
  }

  // Default return value if request fails
  return null
}

export async function unsetFavorite(
  userId: string,
  imageId: ImageId,
  accessToken: string,
) {
  // URI for unsetFavoriteImage endpoint on server
  const uri = `${import.meta.env.VITE_SERVER_URL}/unsetFavoriteImage`

  // Request headers with auth token
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "Access-Control-Allow-Origin": "*",
  }

  // Request body with user ID and image record
  const body = {
    userId,
    imageId,
  }

  console.log("UNsetFavoriteImage body:", { body })

  try {
    // Make POST request to set favorite image
    const response = await axios.post(uri, body, { headers })

    // Handle 200 response
    if (response.status === 200) {
      return true
    }
  } catch (error) {
    // Log any errors
    console.log("Error unsetting favorite image:", error)
  }

  // Default return value if request fails
  return null
}
