import { Flex } from "@mantine/core"
import { ImageItem } from "../imageItem/ImageItem"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Loading from "../../components/loading/Loading"
import type { SearchConfig } from "../../types"
import { useSearch } from "../../hooks/useSearch"

export function RelatedImages({
	identifier,
	limit,
	accessToken,
}: {
	identifier: string
	limit: number
	accessToken: string | null
}) {
	const searchConfig: SearchConfig = { identifier }

	const { images, loading, error } = useSearch(searchConfig)

	if (error) {
		return (
			<Flex>
				<div>No Related Images</div>
			</Flex>
		)
	}

	if (loading) {
		return (
			<Flex>
				<Loading width="100%" />
			</Flex>
		)
	}

	return (
		<ResponsiveMasonry columnsCountBreakPoints={{ 200: 1, 300: 2, 400: 3 }}>
			<Masonry gutter="15px">
				{images?.slice(0, limit).map((image) => (
					<ImageItem key={image.id} image={image} accessToken={accessToken} />
				))}
			</Masonry>
		</ResponsiveMasonry>
	)
}
