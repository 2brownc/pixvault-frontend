import { RouterProvider } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import router from "./router"
import { LoadingOverlay, Box } from "@mantine/core"
import ScrollToTop from "./components/scrollToTop/ScrollToTop"
import { useEffect } from "react"
import { useAppDispatch } from "./app/hooks"
import { updateUser } from "./features/user/userSlice"
import NotificationCenter from "./components/notification/NotificationCenter"

import styles from "./App.module.css"

const App = () => {
	const dispatch = useAppDispatch()
	// Get user, authentication status, loading status, access token getter, and error from useAuth0 hook
	const { user, isAuthenticated, isLoading, getAccessTokenSilently, error } =
		useAuth0()

	// When authentication status or user changes, update the Redux store with user ID and access token
	useEffect(() => {
		if (isAuthenticated && user) {
			// Extract user ID from the user object
			const authUserId = user.sub?.split("|")[1]
			if (authUserId) {
				// Get access token silently and dispatch updateUser action with user ID and access token
				getAccessTokenSilently().then((accessToken) => {
					dispatch(updateUser({ userId: authUserId, accessToken }))
				})
			}
		}
	}, [isAuthenticated, user, getAccessTokenSilently, dispatch])

	// If there is an error, display it
	if (error) {
		return <div>Oops: Auth0 Error: {error.message}</div>
	}

	if (isLoading) {
		return (
			<Box pos="relative">
				<LoadingOverlay
					visible={true}
					zIndex={1000}
					overlayProps={{ radius: "sm", blur: 2 }}
				/>
				LOADING
			</Box>
		)
	}

	return (
		<div>
			<RouterProvider router={router} />
			<ScrollToTop />
			<NotificationCenter />
		</div>
	)
}

export default App
