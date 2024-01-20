import { Image } from "@mantine/core"
import { useHover } from "@mantine/hooks"
import type { Image as ImageType } from "../../types"

export function ImageItem({ image }: { image: ImageType }) {
  const { hovered, ref } = useHover<HTMLImageElement>()

  return (
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
    />
  )
}
