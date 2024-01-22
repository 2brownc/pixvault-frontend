import { Flex } from "@mantine/core"
import type { Image as ImageType } from "../../types"
import { getImages } from "../../utils/getImages"
import { ImageItem } from "../imageItem/ImageItem"
import { useState, useEffect } from "react"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Loading from "../../components/loading/Loading"

export function RelatedImages({
  identifier,
  limit,
}: {
  identifier: string
  limit: number
}) {
  const [images, setImages] = useState<ImageType[] | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const uri = `${import.meta.env.VITE_SERVER_URL}/search/related/${identifier}`
    getImages(uri).then(setImages).catch(setError)
  }, [identifier])

  if (error) {
    return (
      <Flex>
        <div>No Related Images</div>
      </Flex>
    )
  }

  if (!images) {
    return (
      <Flex>
        <Loading width="100%" />
      </Flex>
    )
  }

  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 200: 1, 300: 2, 400: 3 }}>
      <Masonry gutter="15px">
        {images.slice(0, limit).map(image => (
          <ImageItem image={image} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  )
}
