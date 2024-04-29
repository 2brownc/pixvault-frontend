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
		// if user is logged in
		if (accessToken && userId) {
			// image is not currently favorited
			if (!enabled) {
				// optimistically update UI
				setEnabled(true)

				// call API to favorite image
				setFavorite(userId, imageRecord, accessToken).then((result) => {
					// API call succeeded
					if (result) {
						// API call failed
					} else {
						// revert UI update
						setEnabled(false)
					}
				})

				// image is currently favorited
			} else {
				// optimistically update UI
				setEnabled(false)

				// call API to unfavorite image
				unsetFavorite(userId, imageRecord.id, accessToken).then((result) => {
					// API call succeeded
					if (result) {
						// API call failed
					} else {
						// revert UI update
						setEnabled(true)
					}
				})
			}
			// user not logged in
		} else {
			setEnabled(false)
		}
	}
}
