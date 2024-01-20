import { Stack } from "@mantine/core"
import axios, { type AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import Gallery from "./components/gallery/Gallery"
import Hero from "./components/hero/Hero"
import WelcomeSearch from "./components/welcomeSearch/WelcomeSearch"
import type { Image } from "./types"

async function fetchData(): Promise<Image[] | null> {
  try {
    const response: AxiosResponse = await axios.get("http://localhost:3000/")
    return response.data as Image[]
  } catch (error) {
    console.error("Error fetching data:", error)
    // Handle errors appropriately, e.g., display an error message to the user
    return null
  }
}

export default function Home() {
  const [welcomeImages, setWelcomeImages] = useState<Image[] | null>(null)

  useEffect(() => {
    fetchData().then(data => setWelcomeImages(data))
  }, [])

  return (
    <Stack>
      <Hero />

      <WelcomeSearch
        placeholder="What are you looking for?"
        onSearch={() => {}}
      />

      {welcomeImages ? (
        <Gallery images={welcomeImages} />
      ) : (
        <div>Loading...</div>
      )}
    </Stack>
  )
}
