import axios from "axios"
import type { ImageId, ImageRecord } from "../types"

export async function setFavorite(
	userId: string,
	imageRecord: ImageRecord,
	accessToken: string,
): Promise<boolean> {
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

	try {
		// Make POST request to set favorite image
		const response = await axios.post(uri, body, { headers })

		// Handle 200 response
		if (response.status === 200) {
			return true
		}
	} catch (error) {
		// Log any errors
		console.error(error)
	}

	// Default return value if request fails
	return false
}

export async function unsetFavorite(
	userId: string,
	imageId: ImageId,
	accessToken: string,
): Promise<boolean> {
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

	try {
		// Make POST request to set favorite image
		const response = await axios.post(uri, body, { headers })

		// Handle 200 response
		if (response.status === 200) {
			return true
		}
	} catch (error) {
		// Log any errors
		console.error("Error unsetting favorite image:", error)
	}

	// Default return value if request fails
	return false
}

export async function getFavorites(
	userId: string,
	accessToken: string,
): Promise<ImageRecord[] | null> {
	// URI for getFavorites endpoint on server
	const uri = `${import.meta.env.VITE_SERVER_URL}/getFavoriteImages`

	// Request headers with auth token
	const headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${accessToken}`,
		"Access-Control-Allow-Origin": "*",
	}

	const body = {
		userId,
	}

	try {
		// Make POST request to get favorite images
		const response = await axios.post(uri, body, { headers })

		// Handle 200 response
		if (response.status === 200) {
			return response.data as ImageRecord[]
		}
	} catch (error) {
		// Log any errors
		console.error("Error unsetting favorite image:", error)
	}

	// Default return value if request fails
	return null
}
