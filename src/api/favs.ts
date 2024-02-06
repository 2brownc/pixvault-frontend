// import axios from 'axios';

import axios from "axios"
import type { ImageRecord } from "../types"

export async function setFavorite(
  userId: string,
  imageRecord: ImageRecord,
  accessToken: string,
) {
  const uri = `${import.meta.env.VITE_SERVER_URL}/setFavoriteImage`

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "Access-Control-Allow-Origin": "*",
  }

  const body = {
    userId,
    imageRecord,
  }

  try {
    const response = await axios.post(uri, body, { headers })
    return response.data
  } catch (error) {
    console.log("Error setting favorite image:", error)
    return null
  }
}
