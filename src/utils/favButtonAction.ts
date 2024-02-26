import type { ImageRecord } from "../types"
import { setFavorite, unsetFavorite } from "../api/favs"

export function favButtonClick(
  accessToken: string, // user access token
  userId: string, // user id
  imageRecord: ImageRecord, // image record object
) {
  return (
    enabled: boolean, // current state of button
    setEnabled: React.Dispatch<React.SetStateAction<boolean>>, // callback to update state
  ) => {
    // log function inputs
    console.log("fav image: ", accessToken, userId, imageRecord)

    // if user is logged in
    if (accessToken && userId) {
      // image is not currently favorited
      if (!enabled) {
        // optimistically update UI
        setEnabled(true)

        // call API to favorite image
        setFavorite(userId, imageRecord, accessToken).then(result => {
          // API call succeeded
          if (result) {
            console.log("fav button clicked:", imageRecord)
            // API call failed
          } else {
            // revert UI update
            setEnabled(false)
            console.log("fav button clicked but failed:", imageRecord)
          }
        })

        // image is currently favorited
      } else {
        // optimistically update UI
        setEnabled(false)

        // call API to unfavorite image
        unsetFavorite(userId, imageRecord.id, accessToken).then(result => {
          // API call succeeded
          if (result) {
            console.log("image unfaved :)", imageRecord)
            // API call failed
          } else {
            // revert UI update
            setEnabled(true)
            console.log("image unfaved but failed:", imageRecord)
          }
        })

        console.log("image unfaved :(", imageRecord)
      }

      // user not logged in
    } else {
      setEnabled(false)
      console.log("you gotta login before you fav this:", imageRecord)
    }
  }
}
