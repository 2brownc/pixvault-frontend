import { useRef, useEffect } from "react"

export function useInfiniteScroll(loadMore: () => void) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMore()
      }
    })
    observer.observe(containerRef.current!)
    return () => observer.disconnect()
  }, [loadMore])

  return [
    {
      ref: containerRef,
    },
    containerRef,
  ]
}
