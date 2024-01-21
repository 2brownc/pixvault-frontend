import type { AxiosResponse } from "axios"
import type { Image } from "../types"
import axios from "axios"

export async function getImages(uri: string): Promise<Image[] | null> {
  console.log("Fetching images from:", uri)
  try {
    const response: AxiosResponse = await axios.get(uri)
    return response.data as Image[]
  } catch (error) {
    console.error("Error fetching data:", error)
    // Handle errors appropriately, e.g., display an error message to the user
    return null
  }
}
