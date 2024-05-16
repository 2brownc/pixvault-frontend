import { Image, Box } from "@mantine/core"
import { useHover } from "@mantine/hooks"
import type { ImageRecord, Image as ImageType } from "../../types"

import styles from "./ImageItem.module.css"

export function SimpleImageItem({ image }: { image: ImageRecord }) {
	const { hovered, ref } = useHover<HTMLImageElement>()

	return (
		<>
			<Box className={styles.imageContainer}>
				<Image
					ref={ref}
					src={image.thumbnail}
					alt={image.title}
					style={{
						transform: hovered ? "scale(1.1)" : "scale(1)",
						filter: hovered ? "brightness(1.1)" : "brightness(1)",
						transition: "all 0.5s ease",
					}}
					fit="contain"
				/>
			</Box>
		</>
	)
}
