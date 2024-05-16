import { useState, useEffect } from "react"
import styles from "./FavButton.module.css"
import type { ImageRecord } from "../../types"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
	selectFavorites,
	addFavorites,
	removeFavorites,
} from "../../features/user/userSlice"

// AnimatedButton component renders a button with animated state
type AnimatedButtonProps = {
	before: JSX.Element // Content to show before button is clicked
	after: JSX.Element // Content to show after button is clicked
	color: string // Button text color
	userId: string
	accessToken: string
	imageRecord: ImageRecord
}

// Helper function to check if an image is in the user's favorites list
function isFavorite(userFavorites: ImageRecord[], imageRecord: ImageRecord) {
	for (const favorite of userFavorites) {
		if (favorite.id === imageRecord.id) {
			return true
		}
	}

	return false
}

export default function AnimatedButton({
	before,
	after,
	userId,
	accessToken,
	imageRecord,
	color,
}: AnimatedButtonProps) {
	const dispatch = useAppDispatch()
	const userFavorites = useAppSelector(selectFavorites)
	const [enabled, setEnabled] = useState<boolean>(false)

	// Set the initial state of the button based on the user's favorites
	useEffect(() => {
		setEnabled(isFavorite(userFavorites, imageRecord))
	}, [userFavorites, imageRecord])

	const handleClick = () => {
		if (isFavorite(userFavorites, imageRecord)) {
			// Optimistically set the image as unfaved
			setEnabled(false)
			// Dispatch an action to remove the image from the user's favorites
			dispatch(removeFavorites({ userId, accessToken, imageRecord }))
		} else {
			// Optimistically set the image as faved
			setEnabled(true)
			// Dispatch an action to add the image to the user's favorites
			dispatch(addFavorites({ userId, accessToken, imageRecord }))
		}
	}

	return (
		<span className={styles.btnGroup}>
			{/* Main button */}
			<button
				type="button"
				className={styles.btn}
				onClick={handleClick}
				style={{ color }}
			>
				{enabled ? after : before}
			</button>

			{/* Animated copy button */}
			{enabled && (
				<button
					type="button"
					className={`${styles.btn} ${styles.btnCopy}  ${styles.btnAnimated} `}
					style={{ color }}
				>
					{after}
				</button>
			)}
		</span>
	)
}
