import { useParams } from "react-router-dom"
import Gallery from "../../components/gallery/Gallery"
import SearchBox from "../../components/searchBox/SearchBox"
import { Stack, Space, Text, Flex } from "@mantine/core"
import styles from "./Search.module.css"
import { TagBox } from "../../components/tagbox/TagBox"
import Loading from "../../components/loading/Loading"
import { useSearch } from "../../hooks/useSearch"
import useInfiniteScroll from "react-infinite-scroll-hook"
import { useState, useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"

export default function Search() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then(token => {
        setAccessToken(token)
      })

      setUserId(user?.sub || null)

      console.log("userid, token", userId, accessToken)
    }
  }, [isAuthenticated, getAccessTokenSilently, user, userId, accessToken])

  const { keyword, tag } = useParams()
  const { images, loadNextPage, hasNextPage, loading, error } = useSearch({
    keyword: keyword || import.meta.env.VITE_DEFAULT_SEARCHTERM,
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
        {error ? (
          <Flex justify="center" align="center">
            <div>No Images Found</div>
          </Flex>
        ) : (
          <Gallery images={images} userId={userId} accessToken={accessToken} />
        )}
        {loading && <Loading width="100%" />}
      </div>
      <div ref={sentryRef}>
        {/* New images will be loaded when this div enters the screen*/}
      </div>
    </Stack>
  )
}
