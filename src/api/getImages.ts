import type { AxiosResponse } from "axios"
import type { Image } from "../types"
import axios from "axios"
import type { SearchConfig } from "../types"

// const access_token = await getAccessToken()

export async function getImages(
	uri: string,
	searchConfig: SearchConfig,
	accessToken: string,
): Promise<Image[] | null> {
	/*
  if (!access_token) {
    return null
  }
  */

	const headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${accessToken}`,
		"Access-Control-Allow-Origin": `${
			import.meta.env.VITE_SERVER_CROSS_ORIGIN
		}`,
	}

	try {
		const response: AxiosResponse = await axios.post(uri, searchConfig, {
			headers,
		})
		return response.data as Image[]
	} catch (error) {
		return null
	}
}
