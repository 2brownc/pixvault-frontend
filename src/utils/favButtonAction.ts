import type { ImageRecord } from "../types"
import { setFavorite } from "../api/favs"

export function favButtonClick(
  accessToken: string | null,
  userId: string | null,
  imageRecord: ImageRecord,
) {
  return (setEnabled: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (accessToken && userId) {
      setFavorite(userId, imageRecord, accessToken).then(result => {
        if (result) {
          setEnabled(true)
          console.log("fav button clicked:", imageRecord)
        } else {
          setEnabled(false)
          console.log("fav button clicked but failed:", imageRecord)
        }
      })
    } else {
      setEnabled(false)
      console.log("you gotta login before you fav this:", imageRecord)
    }
  }
}
