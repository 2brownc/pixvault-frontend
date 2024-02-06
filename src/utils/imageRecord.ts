import type { Image, ImageRecord } from "../types"

export function getImageRecord(image: Image): ImageRecord {
  const { id, title, thumbnail } = image

  return { id, title, thumbnail, timestamp: new Date() }
}
