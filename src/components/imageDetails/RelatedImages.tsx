import { Flex } from "@mantine/core"
import type { Image as ImageType } from "../../types"
import { getImages } from "../../api/getImages"
import { ImageItem } from "../imageItem/ImageItem"
import { useState } from "react"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Loading from "../../components/loading/Loading"
import type { SearchConfig } from "../../types"

export function RelatedImages({
  identifier,
  limit,
}: {
  identifier: string
  limit: number
}) {
  const [images, setImages] = useState<ImageType[] | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const accessToken = import.meta.env.VITE_ANONAUTH_TOKEN

  if (accessToken) {
    const searchConfig: SearchConfig = { identifier }
    const uri = `${import.meta.env.VITE_SERVER_URL}/search/related/`
    getImages(uri, searchConfig, accessToken).then(setImages).catch(setError)
  } else {
    throw new Error("Anon Auth: access token not set.")
  }

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
