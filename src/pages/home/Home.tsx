import { Flex, Stack } from "@mantine/core"
import { useEffect, useState } from "react"
import Gallery from "../../components/gallery/Gallery"
import Hero from "../../components/hero/Hero"
import SearchBox from "../../components/searchBox/SearchBox"
import type { Image } from "../../types"
import { getImages } from "../../utils/getImages"
import Loading from "../../components/loading/Loading"
import { useSearch } from "../../hooks/useSearch"

export default function Home() {
  const { images, loadNextPage, hasNextPage, loading, error } = useSearch({
    keyword: "scenery|scenic",
    pages: 1,
  })
  return (
    <Stack>
      <Hero />

      <SearchBox placeholder="What are you looking for?" />

      {images && <Gallery images={images} />}

      {loading && <Loading width="90vw" />}

      {error && (
        <Flex justify="center" align="center">
          <div>No Images Found</div>
        </Flex>
      )}
    </Stack>
  )
}
