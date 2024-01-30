import { useState, useEffect, useMemo } from "react"
import type { Image } from "../types"
import { getImages } from "../api/getImages"
import type { SearchConfig } from "../types"

type useSearchProps = {
  keyword?: string | undefined
  tag?: string | undefined
  pages: number
}

type useSearchReturn = {
  loading: boolean
  loadNextPage: () => void
  hasNextPage: boolean
  images: Image[] | null
  error: boolean
}

export function useSearch({
  keyword,
  tag,
  pages,
}: useSearchProps): useSearchReturn {
  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [images, setImages] = useState<Image[] | null>(null)
  const [currentSearch, setCurrentSearch] = useState<string | null>(null)
  const [error, setError] = useState<boolean>(false)
  const [searchConfig, setSearchConfig] = useState<SearchConfig | null>(null)
  const accessToken = import.meta.env.VITE_ANONAUTH_TOKEN

  if (!accessToken) {
    throw new Error("Anon Auth: access token not set.", accessToken)
  }

  // get images based on the search type
  useEffect(() => {
    setImages(null)
    let uri: string | null = null
    if (keyword) {
      uri = `${import.meta.env.VITE_SERVER_URL}/search/keyword/`
      setCurrentSearch(uri)
    } else if (tag) {
      uri = `${import.meta.env.VITE_SERVER_URL}/search/tag/`
      setCurrentSearch(uri)
    }
  }, [keyword, tag])

  useMemo(() => {
    let config = null
    if (keyword) {
      config = { page, q: keyword }
    } else if (tag) {
      config = { page, tags: tag }
    }

    setSearchConfig(config)
  }, [page, tag, keyword])

  // get images when infinite scrolling
  useEffect(() => {
    if (currentSearch && searchConfig && accessToken) {
      setError(false)
      setLoading(true)
      getImages(currentSearch, searchConfig, accessToken)
        .then(data => {
          setImages((oldData: Image[] | any) => {
            if (oldData) {
              return oldData.concat(data)
            } else {
              return data
            }
          })
          setLoading(false)
        })
        .catch(error => {
          console.log("useSearch:", error)
          setError(true)
          setLoading(false)
        })
    }
  }, [page, currentSearch, searchConfig, accessToken])

  const loadNextPage = () => {
    setPage(page + 1)
  }

  // openverse api only supports 1 >= page <= 20
  const hasNextPage = page < 20

  return { images, loadNextPage, hasNextPage, loading, error }
}
