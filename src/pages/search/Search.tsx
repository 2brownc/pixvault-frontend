import { useParams } from "react-router-dom"
import { getImages } from "../../utils/getImages"
import { useState, useEffect } from "react"
import Gallery from "../../components/gallery/Gallery"
import SearchBox from "../../components/searchBox/SearchBox"
import { Stack, Space, Text, Group, Flex } from "@mantine/core"
import type { Image } from "../../types"
import styles from "./Search.module.css"
import { TagBox } from "../../components/tagbox/TagBox"
import { Loading } from "../../components/loading/Loading"

export default function Search() {
  const { keyword, tag } = useParams()
  const [images, setImages] = useState<Image[] | null>(null)
  // openverse api only supports 1 >= page <= 20
  const [page, setPage] = useState<number>(1)
  const [currentSearch, setCurrentSearch] = useState<string | null>(null)

  // get images based on the search type
  useEffect(() => {
    setImages(null)
    let uri: string | null = null
    if (keyword) {
      uri = `${import.meta.env.VITE_SERVER_URL}/search/keyword/${keyword}`
      setCurrentSearch(uri)
    } else if (tag) {
      uri = `${import.meta.env.VITE_SERVER_URL}/search/tag/${tag}`
      setCurrentSearch(uri)
    }
  }, [keyword, tag])

  // get images when infinite scrolling
  useEffect(() => {
    if (currentSearch) {
      getImages(`${currentSearch}/${page}`).then(data =>
        setImages((oldData: Image[] | any) => {
          if (oldData) {
            return oldData.concat(data)
          } else {
            return data
          }
        }),
      )
    }
  }, [page, currentSearch])

  return (
    <Stack>
      <Space />
      <div className={`${styles.searchBoxContainer}`}>
        <Stack align="center" justify="center">
          <SearchBox placeholder={`${keyword || tag}`} />
          <Space />
          <Text size="3rem">results for {`${keyword || tag}`}</Text>
        </Stack>
      </div>
      <Flex justify="center" align="center" wrap="wrap" gap="sm">
        <TagBox images={images} />
      </Flex>
      <div>{images ? <Gallery images={images} /> : <Loading />}</div>
    </Stack>
  )
}
