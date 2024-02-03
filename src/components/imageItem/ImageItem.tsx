import { Image } from "@mantine/core"
import { useHover, useDisclosure } from "@mantine/hooks"
import type { Image as ImageType } from "../../types"
import { ImageDetailsModal } from "../imageDetails/ImageDetails"

import styles from "./ImageItem.module.css"

export function ImageItem({ image }: { image: ImageType }) {
  const [opened, { open, close }] = useDisclosure(false)
  const { hovered, ref } = useHover<HTMLImageElement>()

  return (
    <>
      <div className={styles.imageContainer}>
        <Image
          ref={ref}
          src={image.thumbnail}
          alt={image.url}
          style={{
            transform: hovered ? "scale(1.1)" : "scale(1)",
            filter: hovered ? "brightness(1.1)" : "brightness(1)",
            cursor: hovered ? "pointer" : "auto",
            transition: "all 0.5s ease",
          }}
          onClick={open}
          fit="contain"
        />
      </div>
      <ImageDetailsModal image={image} opened={opened} close={close} />
    </>
  )
}
