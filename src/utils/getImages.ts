import type { AxiosResponse } from "axios"
import type { Image } from "../types"
import axios from "axios"

export async function getImages(uri: string): Promise<Image[] | null> {
  try {
    const response: AxiosResponse = await axios.get(uri)
    return response.data as Image[]
  } catch (error) {
    console.log("Error fetching data:", error)
    return null
  }
}
