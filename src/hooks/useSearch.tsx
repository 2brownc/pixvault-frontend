import { useState, useEffect } from "react"
import type { Image } from "../types"
import { getImages } from "../utils/getImages"

type useSearchProps = {
  keyword: string | undefined
  tag: string | undefined
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
      setError(false)
      setLoading(true)
      getImages(`${currentSearch}/${page}`)
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
        .catch(() => {
          setError(true)
          setLoading(false)
        })
    }
  }, [page, currentSearch])

  const loadNextPage = () => {
    setPage(page + 1)
  }

  // openverse api only supports 1 >= page <= 20
  const hasNextPage = page < 20

  return { images, loadNextPage, hasNextPage, loading, error }
}
