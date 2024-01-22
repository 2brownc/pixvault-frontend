import { useParams } from "react-router-dom"
import Gallery from "../../components/gallery/Gallery"
import SearchBox from "../../components/searchBox/SearchBox"
import { Stack, Space, Text, Flex } from "@mantine/core"
import styles from "./Search.module.css"
import { TagBox } from "../../components/tagbox/TagBox"
import Loading from "../../components/loading/Loading"
import { useSearch } from "../../hooks/useSearch"

export default function Search() {
  const { keyword, tag } = useParams()
  const { images, loadNextPage, hasNextPage, loading, error } = useSearch({
    keyword,
    tag,
    pages: 1,
  })

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
      <div>
        {loading ? (
          <Loading width="90vw" />
        ) : (
          images && <Gallery images={images} />
        )}
        {error && (
          <Flex justify="center" align="center">
            <div>No Images Found</div>
          </Flex>
        )}
      </div>
    </Stack>
  )
}
