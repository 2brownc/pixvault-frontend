import { Stack } from "@mantine/core"
import { useEffect, useState } from "react"
import Gallery from "../../components/gallery/Gallery"
import Hero from "../../components/hero/Hero"
import SearchBox from "../../components/searchBox/SearchBox"
import type { Image } from "../../types"
import { getImages } from "../../utils/getImages"
import Loading from "../../components/loading/Loading"

export default function Home() {
  const [welcomeImages, setWelcomeImages] = useState<Image[] | null>(null)

  useEffect(() => {
    getImages(`${import.meta.env.VITE_SERVER_URL}/welcomeimages`).then(data =>
      setWelcomeImages(data),
    )
  }, [])

  return (
    <Stack>
      <Hero />

      <SearchBox placeholder="What are you looking for?" />

      {welcomeImages ? (
        <Gallery images={welcomeImages} />
      ) : (
        <Loading width="90vw" />
      )}
    </Stack>
  )
}
