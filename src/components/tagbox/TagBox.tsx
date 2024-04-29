import { Button } from "@mantine/core"
import type { Image } from "../../types"
import { Link } from "react-router-dom"
import { navigateToTagSearch } from "../../utils/clickAction"
import { requiredTags } from "../../utils/requiredTags"

export function TagBox({ images }: { images: Image[] | null }) {
	if (!images) return <></>

	let tags: string[] = []
	for (const image of images) {
		if (image.tags.length > 0) {
			tags = [...tags, ...image.tags]
		}
	}

	const uniqueTags = requiredTags(tags, 10)

	return (
		<>
			{uniqueTags.map((tag) => (
				<Link
					key={tag}
					to={navigateToTagSearch(tag)}
					style={{ display: "inline-block" }}
				>
					<Button
						variant="outline"
						size="md"
						color="gray"
						radius="md"
						style={{ textTransform: "capitalize" }}
					>
						{tag}
					</Button>
				</Link>
			))}
		</>
	)
}
