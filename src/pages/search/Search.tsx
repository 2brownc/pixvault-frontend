import { useParams } from "react-router-dom"
import Gallery from "../../components/gallery/Gallery"
import SearchBox from "../../components/searchBox/SearchBox"
import { Stack, Space, Text, Flex } from "@mantine/core"
import styles from "./Search.module.css"
import { TagBox } from "../../components/tagbox/TagBox"
import Loading from "../../components/loading/Loading"
import { useSearch } from "../../hooks/useSearch"
import useInfiniteScroll from "react-infinite-scroll-hook"

export default function Search() {
  const { keyword, tag } = useParams()
  const { images, loadNextPage, hasNextPage, loading, error } = useSearch({
    keyword: keyword || "weather",
    tag,
    pages: 1,
  })

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadNextPage,
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    disabled: !!error,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: "0px 0px 400px 0px",
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
        {images && <Gallery images={images} />}
        {error && (
          <Flex justify="center" align="center">
            <div>No Images Found</div>
          </Flex>
        )}
        {loading && <Loading width="100%" />}
      </div>
      <div ref={sentryRef}></div>
    </Stack>
  )
}
