import { useState, useEffect, useMemo } from "react"
import type { Image, ImageRecord, ImageId } from "../types"
import { getImagesInfo } from "../api/getImages"
import type { SearchConfig } from "../types"

type useSearchProps = {
	imageRecords: ImageRecord[]
	pageSize: number
}

type useSearchReturn = {
	loading: boolean
	loadNextPage: () => void
	hasNextPage: boolean
	images: Image[] | null
	error: boolean
}

function getImageIds(imageRecords: ImageRecord[]): ImageId[] {
	return imageRecords.map((imageRecord) => imageRecord.id)
}

export function useImageListScroller({
	imageRecords,
	pageSize = 9,
}: useSearchProps): useSearchReturn {
	// State variables
	const [loading, setLoading] = useState<boolean>(true)
	const [page, setPage] = useState<number>(1)
	const [images, setImages] = useState<Image[] | null>(null)
	const [queryList, setQueryList] = useState<ImageId[] | null>(null)
	const [error, setError] = useState<boolean>(false)

	// Access token for API calls
	const accessToken = import.meta.env.VITE_ANONAUTH_TOKEN

	// Check if access token is set
	if (!accessToken) {
		throw new Error("Anon Auth: access token not set.", accessToken)
	}

	// Memoized function to update queryList based on page and pageSize
	useEffect(() => {
		if (page) {
			const startAt = pageSize * (page - 1)
			const endAt = pageSize * page
			if (imageRecords.length >= startAt) {
				const newList = getImageIds(imageRecords.slice(startAt, endAt))

				setQueryList(newList)
			}
		}
	}, [pageSize, page, imageRecords])

	// Effect to fetch images based on queryList
	useEffect(() => {
		if (queryList && queryList.length > 0 && accessToken) {
			setError(false)
			setLoading(true)
			getImagesInfo(queryList, accessToken)
				.then((data) => {
					// Concatenate new data with existing data
					setImages((oldData: Image[] | null) => {
						if (oldData && data) {
							return oldData.concat(data)
						}

						if (data) return data

						return null
					})
					setLoading(false)
				})
				.catch((error) => {
					setError(true)
					setLoading(false)
				})
		}
	}, [queryList])

	// Function to load next page
	const loadNextPage = () => {
		setPage(page + 1)
	}

	// Check if there is a next page
	const hasNextPage = page < imageRecords.length / pageSize

	// Return values
	return { images, loadNextPage, hasNextPage, loading, error }
}
